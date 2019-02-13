<template>
  <nav class="md-layout md-gutter md-alignment-center-space-between">
    <div class="md-layout-item md-size-30">
      <h1 id="logo" class="md-display-2">
        <router-link to="/">
          <span class="checkmark">✓</span>ueued In
        </router-link>
      </h1>
    </div>
    <div class="md-layout-item md-size-40">
      <h3 id="tagline" class="md-headline">
        Remember what you
        <em>want</em> to do.
      </h3>
    </div>
    <div class="md-layout-item md-size-30">
      <md-button>Map</md-button>
      <md-button>Calendar</md-button>
      <md-button @click="handleLogOut">Log Out</md-button>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Nav',
};
</script>

<style lang="scss">
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
    text-decoration: none;
    .checkmark {
      color: #fff;
    }
  }
}

#tagline {
  color: #97a7b0;
  em {
    color: #fff;
  }
}
</style>
