<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div>-->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style lang="scss">
body {
  background-color: #051620;
  color: $default-text;
}
#app {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 60px;
}
a {
  text-decoration: none;
  color: #fff;
}
button {
  color: $default-text;
  &.md-primary {
    color: #fff;
    background-color: $music;
  }
}
ul {
  list-style-type: none;
  padding: 0;
}

.md-card {
  background-color: $card-bg;
  .md-card-header {
    padding: 32px;
  }
  .md-card-actions {
    padding: 32px;
  }
}

.md-field {
  &:after {
    background-color: $default-text;
  }
  &.md-has-textarea {
    background-color: #082231;
  }
  &.md-disabled {
    opacity: 0.5;
  }
  .md-input,
  .md-textarea {
    color: #fff;
  }
  svg {
    fill: $default-text;
  }
}
.item-tooltip {
  font-size: 14px;
  background-color: #082231;
  color: #fff;
}
.md-select-menu {
  .md-list {
    background-color: #fff;
  }
}
.md-datepicker-dialog {
  background-color: #fff;
}
.md-switch {
  .md-switch-container {
    background-color: #051620;
    .md-switch-thumb {
      background-color: #fff;
    }
  }
  &.md-checked {
    .md-switch-thumb {
      background-color: $art;
    }
  }
}

.md-radio {
  &.md-checked {
    .md-radio-container {
      border-color: #fff;
      &:after {
        background-color: #fff;
      }
    }
  }
}
</style>
