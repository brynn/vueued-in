<template>
  <div class="auth md-layout md-gutter">
    <div class="md-layout-item md-size-50">
      <AuthForm/>
    </div>
  </div>
</template>

<script>
import AuthForm from '@/components/AuthForm.vue';

import { mapState } from 'vuex';

export default {
  name: 'auth',
  components: {
    AuthForm,
  },

  created() {},
};
</script>
