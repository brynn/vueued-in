<template>
  <div id="app">
    <Nav/>
    <!-- <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div>-->
    <router-view/>
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue';

export default {
  name: 'App',
  components: {
    Nav,
  },
};
</script>

<style lang="scss">
body {
  background-color: #051620;
  color: #97a7b0;
}
#app {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 60px;
  color: #fff;
}
a {
  text-decoration: none;
  color: #fff;
  &.router-link-exact-active {
    text-decoration: underline;
  }
}
button {
  color: #97a7b0;
}
ul {
  list-style-type: none;
  padding: 0;
}
</style>
