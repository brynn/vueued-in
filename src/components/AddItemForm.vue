<template>
  <div id="add-item-form">
    <h2 class="md-title">Add to your ✓ueue:</h2>
    <form novalidate @submit.prevent="validateItem">
      <md-card>
        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-size-50">
              <!-- item name -->
              <md-field :class="getValidationClass('itemName')">
                <label for="itemName">Item Name</label>
                <md-input
                  type="itemName"
                  name="itemName"
                  id="itemName"
                  autocomplete="itemName"
                  ref="itemName"
                  v-model="form.itemName"
                />
                <md-icon>create</md-icon>
                <span class="md-error" v-if="!$v.form.itemName.required">Required</span>
              </md-field>

              <!-- item notes -->
              <md-field>
                <label>Item Notes</label>
                <md-textarea v-model="form.notes"></md-textarea>
                <md-icon>notes</md-icon>
              </md-field>

              <!-- item category -->
              <md-field :class="getValidationClass('categoryId')">
                <label for="categoryId">Category</label>
                <md-select
                  name="categoryId"
                  id="categoryId"
                  v-model="form.categoryId"
                  refs="categoryId"
                  :disabled="showAddCategoryField"
                >
                  <md-option
                    v-for="categoryObj in categories"
                    v-bind:key="categoryObj.category.id"
                    v-bind:value="categoryObj.category.id"
                  >{{categoryObj.category.name}}</md-option>
                </md-select>
                <span class="md-error" v-if="!$v.form.categoryId.required">Required</span>
              </md-field>
            </div>

            <div class="md-layout-item md-size-50">
              <!-- item link -->
              <md-field :class="getValidationClass('link')">
                <label for="link">Item Link</label>
                <md-input
                  type="link"
                  name="link"
                  id="link"
                  autocomplete="link"
                  v-model="form.link"
                />
                <md-icon>link</md-icon>
                <md-tooltip class="item-tooltip" md-direction="left">Does this have a website?</md-tooltip>
                <span class="md-error" v-if="!$v.form.link.url">Not a valid URL</span>
              </md-field>
              <!-- item expiration date -->
              <md-datepicker v-model="form.expirationDate" md-immediately>
                <label>Expiration Date</label>
                <md-tooltip
                  class="item-tooltip"
                  md-direction="left"
                >Do you have to do this by a certain time?</md-tooltip>
              </md-datepicker>
            </div>

            <!-- item location -->
            <div v-show="selectedCategoryHasLocation" class="md-layout-item md-size-50">
              <md-field>
                <input
                  ref="autocomplete"
                  v-model="form.location"
                  type="text"
                  onfocus="form.location = null"
                  placeholder
                  width="300"
                  name="location"
                  :class="getLocationInputClass()"
                >
                <label for="location">Item Location</label>
                <md-icon>location_on</md-icon>
                <md-tooltip class="item-tooltip" md-direction="left">Does this have a location?</md-tooltip>
              </md-field>
            </div>

            <!-- add new category  -->
            <div class="md-layout-item">
              <md-button
                type="button"
                v-show="!showAddCategoryField"
                @click="showAddCategoryField=true"
              >
                <md-icon>add</md-icon>&nbsp;Add a New Category...
              </md-button>

              <div @hide-category-form="showAddCategoryField=false" v-show="showAddCategoryField">
                <form novalidate @submit.prevent="handleAddCategory">
                  <div class="md-layout md-gutter md-layout-bottom">
                    <div class="md-layout-item">
                      <md-field>
                        <label for="categoryName">Category Name</label>
                        <md-input
                          type="categoryName"
                          name="categoryName"
                          id="categoryName"
                          autocomplete="categoryName"
                          v-model="form.categoryName"
                        />
                      </md-field>
                    </div>
                    <div class="md-layout-item">
                      <div>
                        <p class="md-subheading">Do items in this category have locations?</p>
                      </div>
                      <div>
                        <md-radio v-model="form.doesNewCategoryHavePlace" value="never">Never</md-radio>
                        <md-radio
                          v-model="form.doesNewCategoryHavePlace"
                          value="sometimes"
                        >Sometimes</md-radio>
                        <md-radio v-model="form.doesNewCategoryHavePlace" value="always">Always</md-radio>
                      </div>
                    </div>
                  </div>
                  <div class="md-layout">
                    <md-button type="submit" class="md-primary md-raised">Add Category</md-button>
                    <md-button
                      type="button"
                      v-show="showAddCategoryField"
                      @click.prevent="showAddCategoryField=false"
                    >Cancel</md-button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </md-card-content>

        <md-card-actions>
          <md-button
            type="submit"
            class="md-primary md-raised"
            :disabled="showAddCategoryField"
          >Add Item</md-button>
        </md-card-actions>
      </md-card>
    </form>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { validationMixin } from 'vuelidate';
import { required, url } from 'vuelidate/lib/validators';

export default {
  name: 'AddItemForm',
  mixins: [validationMixin],
  data: () => ({
    form: {
      itemName: null,
      link: null,
      notes: null,
      expirationDate: null,
      categoryId: null,
      categoryName: null,
      doesNewCategoryHavePlace: 'never',
      autocomplete: null,
      location: null,
    },
    showAddCategoryField: false,
  }),
  computed: {
    ...mapState({
      user: state => state.users.loggedInUser,
      categories: state => state.categories.all,
      selectedCategory: state => state.categories.selectedCategory,
      newLocationId: state => state.items.newLocationId,
    }),
    selectedCategoryHasLocation: function() {
      return (
        this.selectedCategory.id && !(this.selectedCategory.isPlace === 'never')
      );
    },
  },
  watch: {
    'form.categoryId': function(categoryId) {
      if (categoryId) {
        this.$store.dispatch('categories/fetchCategory', {
          userId: this.user.id,
          categoryId,
        });
      }
      if (this.selectedCategoryHasLocation) {
        this.$refs.autocomplete.$el.focus();
      }
    },
  },
  validations: {
    form: {
      itemName: {
        required,
      },
      link: {
        url,
      },
      categoryId: {
        required,
      },
    },
  },
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];
      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty,
        };
      }
    },
    getLocationInputClass() {
      return this.autocomplete &&
        this.form.location &&
        this.form.location !== ''
        ? 'location-input-has-value'
        : '';
    },
    handleAddItem() {
      const itemName = this.form.itemName;
      const categoryId = this.form.categoryId;
      const link = this.form.link;
      const notes = this.form.notes;
      const expirationDate = this.form.expirationDate;
      const locationId = this.newLocationId;
      const payLoad = {
        userId: this.user.id,
        item: {
          name: itemName,
          categoryId,
          link,
          notes,
          expirationDate,
          locationId,
        },
      };
      this.$store.dispatch('items/addItem', payLoad);
      this.clearForm();
      this.scrollToTop();
    },
    validateItem() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.handleAddItem();
      }
    },
    handleAddCategory() {
      const name = this.form.categoryName;
      const isPlace = this.form.doesNewCategoryHavePlace;
      const payLoad = {
        userId: this.user.id,
        category: { name, isPlace },
      };
      if (name) {
        // add the new category
        this.$store.dispatch('categories/addCategory', payLoad);
        this.form.categoryId = this.lastAddedId;
        // reset add category field
        this.showAddCategoryField = false;
        this.form.categoryName = null;
        this.form.doesNewCategoryHavePlace = 'never';
        // focus the item name or category input
        this.$refs.itemName.$el.focus();
      } else {
        // TODO: display error message: category name cannot be blank
      }
    },
    clearForm() {
      this.$v.$reset();
      this.form.itemName = null;
      this.form.link = null;
      this.form.notes = null;
      this.form.expirationDate = null;
      this.form.categoryId = null;
      this.form.location = null;
      this.$store.commit('categories/setSelectedCategory', {});
    },
    scrollToTop() {
      window.scrollBy({ top: -300, left: 0, behavior: 'smooth' });
    },
  },
};
</script>

<style lang="scss">
#add-item-form {
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
</style>
