<template>
  <div class="mr-6 ml-6 flex justify-content-between" v-if="currentUser">
    <div class="flex align-items-center">
      <div class="text-lg">Username: <span class="text-lg font-bold">{{ currentUser.getUsername() }}</span></div>
    </div>
    <div class="flex align-items-center">
      <Button label="Log Out" class="p-button-secondary flex" @click="logOut()"></Button>
    </div>
  </div>
  <img alt="Vue logo" src="./assets/logo.png" class="center">

  <ParseDemo v-if="currentUser" msg="Parse Demo App" :user="currentUser" />
  <Login v-else @loggedInUser="(user) => currentUser = user" />
</template>

<script>
import ParseDemo from './components/ParseDemo.vue';
import Login from './components/Login.vue';
import Parse from 'parse/dist/parse.min.js';

export default {
  name: 'App',
  components: {
    ParseDemo,
    Login
  },
  data() {
    return {
      currentUser: null,
    }
  },
  mounted() {
    // Parse initialization
    Parse.initialize(process.env.VUE_APP_PARSE_SERVER_APPLICATION_ID);
    Parse.serverURL = process.env.VUE_APP_PARSE_SERVER_URL;

    this.currentUser = Parse.User.current();
  },
  methods: {
    logOut() {
      Parse.User.logOut().then(() => {
        this.currentUser = Parse.User.current();  // this will now be null
      });
    }
  }
}
</script>

<style lang="scss">
@import 'primeflex/primeflex.scss';

.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 10em;
  height: 10em;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 20px;
  min-width: 260px;
}
</style>
