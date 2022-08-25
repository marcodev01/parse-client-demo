<template>
  <img alt="Vue logo" src="./assets/logo.png">
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
