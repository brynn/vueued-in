<template>
  <div id="item-list">
    <md-card>
      <md-card-content>Items to go here</md-card-content>
    </md-card>
  </div>
</template>
<script>
export default {
  name: 'ItemList',
};
</script>


<style scoped lang="scss">
#item-list {
  .md-card {
    background-color: $card-bg;
    margin-bottom: 20px;
  }
}
</style>
