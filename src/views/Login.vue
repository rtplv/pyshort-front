<template>
  <div class="login-page">
    <h3>Вход</h3>

    <b-form @submit.prevent="doLogin">
      <b-form-group
          id="input-group-1"
          label="Логин:"
          label-for="input-1"
      >
        <b-form-input
            id="input-1"
            v-model="login"
            type="text"
            required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Пароль:" label-for="input-2">
        <b-form-input
            id="input-2"
            v-model="password"
            type="password"
            required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Войти</b-button>
    </b-form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'Login',
  data: () => ({
    login: "",
    password: "",
    errors: [],
  }),
  methods: {
    async doLogin() {
      try {
        const {data: {token}} = await axios.post(`/auth/login`, {
          login: this.login,
          password: this.password
        })
        localStorage.setItem("token", token)
        await this.$store.dispatch("getUser")
        await this.$router.push("/")
      } catch (e) {
        this.$bvToast.toast(e.response.data, {
          title: "Ошибка",
          variant: "danger",
          solid: true,
          autoHideDelay: 5000,
        })

      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.login-page {
    display: flex;
    justify-content: center;
    width: 500px;
    flex-direction: column;
    /* padding: 0 50px; */
    margin: 0 auto;
}
</style>
