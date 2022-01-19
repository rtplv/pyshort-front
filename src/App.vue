<template>
  <div id="app">
    <b-navbar toggleable="lg" type="light" variant="info">
      <b-navbar-brand to="/">pyshort</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav v-if="user">
          <b-nav-item to="/urls">Мои ссылки</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto" v-else>
          <b-nav-item to="/login" right>Войти</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto" v-if="user">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>{{ user.login }}</em>
            </template>
            <b-dropdown-item @click="logout">Выход</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <div class="app-view">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      // TODO: тут нужно в будущем гасить токен на сервере
      localStorage.removeItem("token")
      this.$store.commit("setUser", null)
      this.$router.push("/")
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  async mounted() {
    if (localStorage.getItem("token")) {
      await this.$store.dispatch("getUser")
    }
  }
}
</script>

<style lang="scss">
$body-bg: #000;
$body-color: #111;
@import '~bootstrap';
@import '~bootstrap-vue';
@import 'node_modules/bootstrap/scss/bootstrap.scss';
@import 'node_modules/bootstrap-vue/src/index.scss';

body {
  margin: 0;
  font-family: 'Roboto', sans-serif;
  .bg-info {
      background-color: white !important;
  }
}

.app-view {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 50px;
  flex-direction: column;
  /* padding: 0 50px; */
}
</style>
