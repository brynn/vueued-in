<template>
  <div class="home">
    <AllItems msg="Items will appear here"/>
  </div>
</template>

<script>
// @ is an alias to /src
import AllItems from '@/components/AllItems.vue';

export default {
  name: 'home',
  components: {
    AllItems,
  },
};
</script>
