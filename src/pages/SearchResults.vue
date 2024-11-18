<template>
  <div class="search-results">
    <h1>Search Results</h1>

    <div v-if="loading">Loading...</div>

    <div v-else-if="!stories.length">No results found</div>

    <div v-else>
      <PostItem
          v-for="story in stories"
          :key="story.id"
          :post="story"
      />
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import PostItem from "@/components/PostItem.vue";
import { useStore } from "@/store/useStore.js";

export default {
  components: { PostItem },
  setup() {
    const store = useStore();
    const loading = ref(false);
    const route = useRoute();

    const fetchResults = async () => {
      const query = route.query.q;
      if (query) {
        loading.value = true;
        await store.searchForPosts(query);
        loading.value = false;
      }
    };

    onMounted(() => {
      fetchResults();
    });


    watch(() => route.query.q, () => {
      fetchResults();
    });

    return {
      stories: store.searchResults,
      loading,
    };
  },
};
</script>

<style scoped>
.search-results {
  margin: 20px;
}

.search-results h1 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

.search-results div {
  margin-top: 10px;
}
</style>
