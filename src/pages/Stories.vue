<template>
  <div class="container">
    <div v-if="loading" class="loading">Loading...</div>

    <div v-if="error" class="error">Error: {{ error }}</div>

    <ul v-if="!loading && !error && Array.isArray(stories) && stories.length" class="story-list">
      <li v-for="story in stories" :key="story.id">
        <PostItem :post="story"/>
      </li>
    </ul>

    <div v-if="!loading && !error && (!stories || stories.length === 0)" class="no-stories">
      No stories to display.
    </div>

    <div v-if="!loading && !error && allStoryIds.length > 0" class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1" class="pagination-btn">
        Previous
      </button>
      <span class="page-info">Page {{ currentPage }}</span>
      <button @click="nextPage" :disabled="currentPage * itemsPerPage >= allStoryIds.length" class="pagination-btn">
        Next
      </button>
    </div>
  </div>
</template>

<script>
import {onMounted, watch, computed} from "vue";
import {useRoute} from "vue-router";
import {useStore} from "@/store/useStore.js";
import PostItem from "@/components/PostItem.vue";

export default {
  name: "Stories",
  components: {
    PostItem,
  },
  setup() {
    const postsStore = useStore();
    const route = useRoute();

    // Use computed to bind the reactive state directly from the store
    const stories = computed(() => postsStore.stories);
    const loading = computed(() => postsStore.loading);
    const error = computed(() => postsStore.error);
    const currentPage = computed(() => postsStore.currentPage);
    const itemsPerPage = computed(() => postsStore.itemsPerPage);
    const allStoryIds = computed(() => postsStore.allStoryIds);

    const loadStories = () => {
      postsStore.loadStories(route.path).catch(err => {
        console.error("Error loading stories:", err);
      });
    };

    watch(() => route.path, () => {
      postsStore.resetPagination();
      loadStories();
    });

    onMounted(() => {
      loadStories();
    });

    return {
      stories,
      loading,
      error,
      currentPage,
      itemsPerPage,
      allStoryIds,
      loadStories,
      nextPage: postsStore.nextPage,
      prevPage: postsStore.prevPage,
    };
  },
};
</script>

<style scoped>
/* Base Styles */
.container {

  color: #f8f8f2;
  font-family: 'Courier New', Courier, monospace;
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  font-size: 24px;
  color: #ff6600;
  text-align: center;
  margin-bottom: 20px;
}

.loading, .error {
  text-align: center;
  color: #ff6600;
  font-size: 18px;
}

.no-stories {
  text-align: center;
  color: #f8f8f2;
  font-size: 18px;
  padding: 20px;
}

.story-list {
  list-style-type: none;
  padding: 0;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

.pagination-btn {
  background-color: #333;
  color: #f8f8f2;
  border: 1px solid #555;
  padding: 5px 15px;
  margin: 0 10px;
  cursor: pointer;
  font-size: 14px;
}

.pagination-btn:disabled {
  background-color: #666;
  cursor: not-allowed;
}

.page-info {
  display: flex;
  align-items: center;
  color: #1a1a1a;
  font-size: 14px;
  margin-top: 7px;
}

.pagination-btn:hover:not(:disabled) {
  background-color: #ff6600;
  border-color: #ff6600;
}
</style>
