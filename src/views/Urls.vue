  <template>
    <div class="products">
      <b-table striped hover :items="urls" :fields="fields">
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
    name: 'Urls',
    data: () => ({
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
      urls: []
    }),
    mounted() {
      this.getUrls()
    },
    methods: {
      async getUrls() {
        const {data: {urls}} = await axios.get(`/shortener/urls`)

        this.urls = urls
            .sort((a, b) => b.id - a.id)
            .map(u => ({
              "original_url": u.original_url,
              "short_url": `${serverUrl}/${u.short_id}`
            }))
      }
    }
  }
  </script>
