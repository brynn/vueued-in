<template>
  <div class="home">
    <CategoryFilters/>
    <ItemList/>
    <AddItemForm/>
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
