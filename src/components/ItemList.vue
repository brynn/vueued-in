<template>
  <div id="item-list">
    <md-card>
      <md-card-header>
        <md-switch
          v-show="visibleItems.length"
          class="md-subheading"
          v-model="hideCompleted"
          @change="handleToggleCompletedItems"
        >Hide Completed Items</md-switch>
      </md-card-header>
      <md-card-content>
        <md-list id="item-list" v-if="visibleItems.length">
          <div v-for="itemObj in items" :key="itemObj.item.id" v-show="!itemObj.isFiltered">
            <md-list-item
              v-show="hideCompleted ? !itemObj.isCompleted : true"
              v-bind:class="[itemObj.item.category && itemObj.item.category.isDefault ? itemObj.item.category.slug : 'custom']"
            >
              <md-checkbox
                v-bind:value="!itemObj.isCompleted"
                @change="handleCheck(itemObj.item.id)"
              />
              <span v-if="itemObj.item.link" class="md-list-item-text">
                <a v-bind:href="itemObj.item.link" target="_blank">{{itemObj.item.name}}</a>
              </span>
              <span v-else class="md-list-item-text">{{itemObj.item.name}}</span>
              <small class="item-notes">{{itemObj.item.notes}}</small>
              <div @click.stop="handleRemove(itemObj.item.id)">
                <md-button
                  class="md-icon-button md-list-action item-icons"
                  @mouseover.native="toggleDeleteIcon(itemObj.item)"
                  @mouseout.native="toggleDeleteIcon(itemObj.item)"
                >
                  <md-icon>
                    <span v-if="!itemObj.showDeleteIcon">{{itemObj.item.category.icon}}</span>
                    <span v-else>cancel</span>
                  </md-icon>
                  <md-tooltip md-direction="right" md-delay="300">Delete</md-tooltip>
                </md-button>
              </div>
            </md-list-item>
          </div>
        </md-list>
        <md-empty-state
          v-else
          class="md-primary"
          md-rounded
          md-icon="filter_none"
          md-label="Nothing in this ✓ueue"
          md-description="Add some items!"
        ></md-empty-state>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
export default {
  name: 'ItemList',
  data: () => ({
    hideCompleted: false,
  }),
  computed: {
    ...mapState({
      user: state => state.users.loggedInUser,
      items: state => state.items.all,
    }),
    ...mapGetters({
      visibleItems: 'items/getVisibleItems',
      selectedCategoryIds: 'categories/getSelectedCategoryIds',
    }),
    // will be an array of ids e.g. [2, 6, 11]
    completedItemIds: function() {
      const completedItems = this.items.filter(itemObj => itemObj.isCompleted);
      return completedItems.length > 0
        ? completedItems.map(itemObj => itemObj.item.id)
        : [];
    },
  },
  methods: {
    handleCheck(itemId) {
      const userId = this.user.id;
      this.$store.dispatch('items/checkItem', { userId, itemId });
    },
    handleRemove(itemId) {
      this.$store.dispatch('items/removeItem', {
        userId: this.user.id,
        itemId,
      });
    },
    toggleDeleteIcon(item) {
      this.$store.commit('items/toggleDeleteIcon', item.id);
    },
    handleToggleCompletedItems() {
      if (this.selectedCategoryIds.length) {
        this.$store.commit(
          'items/filterByCategoryIds',
          this.selectedCategoryIds
        );
      } else {
        this.$store.commit('items/resetFilters');
      }
    },
  },
  created() {
    if (this.user.id) {
      this.$store.dispatch('items/fetchItems', this.user.id);
    }
  },
};
</script>

<style scoped lang="scss">
#item-list {
  font-family: 'Roboto Mono', monospace;
  .md-card {
    background-color: $card-bg;
    margin-bottom: 20px;
  }
  small {
    &.item-notes {
      font-size: 14px;
      font-weight: 300;
      color: $default-text;
    }
  }
  a {
    text-decoration: underline;
    &:hover {
      color: #fff;
      text-decoration: none;
    }
  }
  .item-icons {
    opacity: 0.4;
    &:hover {
      opacity: 0.8;
    }
  }
}
</style>
