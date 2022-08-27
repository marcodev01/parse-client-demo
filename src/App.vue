<template>
  <img alt="Vue logo" src="./assets/logo.png" class="center">
  <ParseDemo msg="Parse Demo App"/>
</template>

<script>
import ParseDemo from './components/ParseDemo.vue'

export default {
  name: 'App',
  components: {
    ParseDemo
  }
}
</script>

<style lang="scss">
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
  margin-top: 60px;
}
</style>
