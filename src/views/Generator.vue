<template>
  <div class="generator">
    <b-form @submit.prevent="generate">
      <b-form-group
          id="input-group-1"
          label-for="input-1"
      >
        <b-form-input
            id="input-1"
            v-model="fullLink"
            type="text"
            placeholder="Введите ссылку"
            required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Сгенерировать</b-button>
    </b-form>

    <b-table style="margin-top: 50px" striped hover v-if="generatedUrls.length" :items="generatedUrls" :fields="fields">
        <template #cell(original_url)="data">
          <a :href="data.item.original_url" target="_blank">{{data.item.original_url}}</a>
        </template>
        <template #cell(short_url)="data">
          <a :href="data.item.short_url" target="_blank">{{data.item.short_url}}</a>
        </template>
      </b-table>
  </div>
</template>

<script>
import axios from "axios";
import {serverUrl} from "@/main";

export default {
  name: 'Generator',
  data: () => ({
    fullLink: "",
    fields: [
      {
        key: 'original_url',
        label: 'Полная ссылка'
      },
      {
        key: 'short_url',
        label: 'Сокращенная ссылка'
      },
    ],
    generatedUrls: []
  }),
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  methods: {
    async generate() {


      try {
        const {data: {short_id}} = await axios.post(`/shortener/generate`, {
          "original_url": this.fullLink,
          "user_id": this.user && this.user.id ? this.user.id : null
        })
        this.generatedUrls.unshift({
          "original_url": this.fullLink,
          "short_url": `${serverUrl}/${short_id}`,
        })

        this.fullLink = ""
      } catch (e) {
        if (e.response.data.errors[0].loc[0] == "original_url") {
          this.$bvToast.toast("Некорректный URL", {
            title: "Ошибка",
            variant: "danger",
            solid: true,
            autoHideDelay: 5000,
          })
        }
      }
    }
  }
}
</script>
