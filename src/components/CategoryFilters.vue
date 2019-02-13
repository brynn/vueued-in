<template>
  <div id="category-filters">
    <md-card>
      <md-card-header>
        <div class="md-subheading">Filter by Category</div>
      </md-card-header>
      <md-card-content>
        <md-list v-if="categories.length">
          <md-list-item v-for="categoryObj in categories" :key="categoryObj.category.id">
            <md-checkbox
              v-bind:class="[categoryObj.category.isDefault ? categoryObj.category.slug : 'custom']"
              v-model="selectedCategoryIds"
              v-bind:value="categoryObj.category.id"
              @change="handleCheckCategory(categoryObj.category.id)"
            >
              <span class="md-list-item-text">{{categoryObj.category.name}}</span>
            </md-checkbox>

            <div @click.stop="handleRemoveCategory(categoryObj.category)">
              <md-button
                class="md-icon-button md-list-action category-icons"
                v-bind:class="[categoryObj.category.isDefault ? 'category-delete-icon-on-hover' : 'custom']"
                @mouseover.native="toggleDeleteIcon(categoryObj.category)"
                @mouseout.native="toggleDeleteIcon(categoryObj.category)"
              >
                <md-icon class="icon-delete md-size-2x">
                  <span v-if="!categoryObj.showDeleteIcon">{{categoryObj.category.icon}}</span>
                  <span v-else>cancel</span>
                </md-icon>
                <md-tooltip
                  v-show="!categoryObj.category.isDefault"
                  md-direction="right"
                  md-delay="300"
                >Delete Category</md-tooltip>
              </md-button>
            </div>
          </md-list-item>
        </md-list>
        <div v-else>
          <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
        </div>
      </md-card-content>
    </md-card>
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  name: 'CategoryFilters',
  computed: {
    ...mapState({
      user: state => state.users.loggedInUser,
      categories: state => state.categories.all,
    }),
    // will be an array of ids e.g. [2, 6, 11]
    selectedCategoryIds: {
      get: function() {
        if (this.categories.length) {
          const selectedCategories = this.categories.filter(
            categoryObj => categoryObj.isSelected
          );
          return selectedCategories.length > 0
            ? selectedCategories.map(categoryObj => categoryObj.category.id)
            : [];
        }
      },
    },
  },
  methods: {
    handleCheckCategory(categoryId) {
      this.$store.commit('categories/checkCategory', categoryId);
      if (this.selectedCategoryIds.length) {
        this.$store.commit(
          'items/filterByCategoryIds',
          this.selectedCategoryIds
        );
      } else {
        this.$store.commit('items/resetFilters');
      }
    },
    handleRemoveCategory(category) {
      if (category.isDefault) return;
      else {
        this.$store.dispatch('categories/removeCategory', {
          userId: this.user.id,
          categoryId: category.id,
        });
      }
    },
    toggleDeleteIcon(category) {
      // default categories can't be deleted
      if (!category.isDefault) {
        this.$store.commit('categories/toggleDeleteIcon', category.id);
      }
    },
  },
  created() {
    if (this.user.id) {
      this.$store.dispatch('items/fetchItems', this.user.id);
      this.$store.dispatch('categories/fetchCategories', this.user.id);
    }
  },
};
</script>

<style scoped lang="scss">
#category-filters {
  .md-card {
    background-color: $card-bg;
  }
}
</style>
