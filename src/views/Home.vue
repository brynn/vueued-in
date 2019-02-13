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

import { mapState } from 'vuex';

export default {
  name: 'home',
  components: {
    CategoryFilters,
    ItemList,
    AddItemForm,
  },
  computed: {
    ...mapState({
      user: state => state.users.loggedInUser,
      items: state => state.items.all,
    }),
  },
  created() {
    this.$store.dispatch('users/login', {
      email: 'brynn.shepherd@gmail.com',
      password: '123',
    });
  },
};
</script>

<style lang="scss">
.md-checkbox {
  .md-checkbox-container {
    height: 24px;
    width: 24px;
    &:after {
      top: 2px;
      left: 7px;
    }
  }
}
.books {
  color: $books;
  a {
    color: $books;
  }
  .md-checkbox {
    &.md-checked {
      .md-checkbox-container {
        background-color: $books;
      }
    }
    .md-checkbox-container {
      border-color: $books;
    }
  }
  .md-icon {
    color: $books;
  }
}
.movies {
  color: $movies;
  a {
    color: $movies;
  }
  .md-checkbox {
    &.md-checked {
      .md-checkbox-container {
        background-color: $movies;
      }
    }
    .md-checkbox-container {
      border-color: $movies;
    }
  }
  .md-icon {
    color: $movies;
  }
}
.tv_shows {
  color: $tv-shows;
  a {
    color: $tv-shows;
  }
  .md-checkbox {
    &.md-checked {
      .md-checkbox-container {
        background-color: $tv-shows;
      }
    }
    .md-checkbox-container {
      border-color: $tv-shows;
    }
  }
  .md-icon {
    color: $tv-shows;
  }
}
.music {
  color: $music;
  a {
    color: $music;
  }
  .md-checkbox {
    &.md-checked {
      .md-checkbox-container {
        background-color: $music;
      }
    }
    .md-checkbox-container {
      border-color: $music;
    }
  }
  .md-icon {
    color: $music;
  }
}
.bars_restaurants {
  color: $bars-restaurants;
  a {
    color: $bars-restaurants;
  }
  .md-checkbox {
    &.md-checked {
      .md-checkbox-container {
        background-color: $bars-restaurants;
      }
    }
    .md-checkbox-container {
      border-color: $bars-restaurants;
    }
  }
  .md-icon {
    color: $bars-restaurants;
  }
}
.art {
  color: $art;
  a {
    color: $art;
  }
  .md-checkbox {
    &.md-checked {
      .md-checkbox-container {
        background-color: $art;
      }
    }
    .md-checkbox-container {
      border-color: $art;
    }
  }
  .md-icon {
    color: $art;
  }
}
</style>
