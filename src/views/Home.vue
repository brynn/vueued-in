<template>
  <div class="home md-layout md-gutter">
    <CategoryFilters class="md-layout-item md-size-30"/>
    <div class="md-layout-item md-size-70">
      <ItemList/>
      <AddItemForm/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import CategoryFilters from '@/components/CategoryFilters.vue';
import ItemList from '@/components/ItemList.vue';
import AddItemForm from '@/components/AddItemForm.vue';

export default {
  name: 'home',
  components: {
    CategoryFilters,
    ItemList,
    AddItemForm,
  },
};
</script>

