<template>
  <div id="category-filters">
    <md-card>
      <md-card-header>
        <div class="md-subheading">Filter by Category</div>
      </md-card-header>
      <md-card-content>
        <md-list v-if="categories.length">
          <md-list-item
            v-for="categoryObj in categories"
            :key="categoryObj.category.id"
            v-bind:class="[
              categoryObj.category.isDefault
                ? categoryObj.category.slug
                : 'custom',
            ]"
          >
            <md-checkbox
              v-model="selectedCategoryIds"
              v-bind:value="categoryObj.category.id"
              @change="handleCheckCategory(categoryObj.category.id)"
            >
              <span class="md-list-item-text">{{ categoryObj.category.name }}</span>
            </md-checkbox>

            <div @click.stop="handleRemoveCategory(categoryObj.category)">
              <md-button
                class="md-icon-button md-list-action category-icons"
                v-bind:class="[
                  categoryObj.category.isDefault
                    ? 'category-delete-icon-on-hover'
                    : 'custom',
                ]"
                @mouseover.native="toggleDeleteIcon(categoryObj.category)"
                @mouseout.native="toggleDeleteIcon(categoryObj.category)"
              >
                <md-icon class="icon-delete md-size-2x">
                  <span v-if="!categoryObj.showDeleteIcon">{{ categoryObj.category.icon }}</span>
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
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'CategoryFilters',
  computed: {
    ...mapState({
      user: state => state.users.loggedInUser,
      categories: state => state.categories.all,
    }),
    ...mapGetters({
      visibleItems: 'items/getVisibleItems',
      selectedCategoryIds: 'categories/getSelectedCategoryIds',
    }),
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
      this.$store.dispatch('categories/fetchCategories', this.user.id);
    }
  },
};
</script>

<style scoped lang="scss">
#category-filters {
  .md-card {
    background-color: $card-bg;
    .md-card-header {
      padding: 32px;
    }
  }
  .md-list-item-container {
    font-weight: 500;
    font-size: 20px;
  }
  .md-icon-button {
    width: 48px;
    height: 48px;
    min-width: 48px;
  }
  .md-icon.md-size-2x {
    font-size: 30px !important;
    width: 30px;
    height: 30px;
    min-width: 30px;
  }
  .category-icons {
    opacity: 0.6;
    &:hover {
      opacity: 1;
    }
  }
}
</style>
