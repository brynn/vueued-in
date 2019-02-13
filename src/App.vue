<template>
  <div id="app">
    <h1 id="logo">
      <router-link to="/items">
        <span class="checkmark">✓</span>ueued In
      </router-link>
    </h1>
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
body {
  background-color: #051620;
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
#logo {
  font-family: 'Roboto Mono', monospace;
  font-weight: 500;
  a {
    transition: 0.3s;
    .checkmark {
      font-size: 60px;
      color: rgb(0, 121, 191);
      transition: 0.5s;
    }
  }
  a:hover {
    color: rgb(151, 167, 176);
    .checkmark {
      color: #fff;
    }
  }
}
#nav {
}
</style>
