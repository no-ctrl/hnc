<template>
  <div v-if="selectedPost" class="post-detail">
    <h1 class="post-title">{{ selectedPost.title }}</h1>

    <a v-if="selectedPost.url" :href="selectedPost.url" target="_blank" rel="noopener noreferrer" class="post-link-text">
      {{ selectedPost.url }}
    </a>

    <p v-if="selectedPost.text" v-html="selectedPost.text" class="post-content"></p>

    <a v-if="selectedPost.url" :href="selectedPost.url" target="_blank" class="post-link">
      Read the full article
    </a>

    <p v-if="selectedPost.kids" class="comment-count">
      {{ selectedPost.descendants }} {{ selectedPost.descendants === 1 ? 'comment' : 'comments' }}
    </p>

    <Comments :commentIds="selectedPost.kids ?? []" />
  </div>

  <div v-else class="loading">Loading post details...</div>
</template>

<script>
import { useStore } from "@/store/useStore.js";
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import Comments from "@/components/Comments.vue";

export default {
  components: { Comments },
  setup() {
    const postsStore = useStore();
    const route = useRoute();

    const selectedPost = computed(() => postsStore.postDetails);

    onMounted(() => {
      const postId = route.params.id;
      postsStore.loadPostDetails(postId);
    });

    return { selectedPost };
  },
};
</script>

<style scoped>
:root {
  --primary-color: #ff6600;
  --hover-color: #ff8533;
  --text-light: #333;
  --text-dark: #ddd;
  --background-light: #fff;
  --background-dark: #1e1e1e;
  --border-light: #e0e0e0;
  --border-dark: #444;
}

body {
  background-color: var(--background-light);
  color: var(--text-light);
}

.post-detail {
  max-width: 800px;
  margin: 30px auto;
  padding: 20px;
  background-color: var(--background-light);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.dark .post-detail {
  background-color: var(--background-dark);
}

.post-title {
  font-size: 28px;
  font-weight: bold;
  color: var(--primary-color);
  margin-bottom: 15px;
}

.post-link-text {
  font-size: 14px;
  color: var(--text-light);
  word-break: break-word;
  margin-bottom: 10px;
  display: inline-block;
}

.dark .post-link-text {
  color: var(--text-dark);
}

.post-content {
  font-size: 16px;
  color: var(--text-light);
  line-height: 1.6;
  margin-bottom: 20px;
}

.dark .post-content {
  color: var(--text-dark);
}

.post-link {
  display: inline-block;
  color: var(--primary-color);
  text-decoration: none;
  padding: 10px 20px;
  border: 1px solid var(--primary-color);
  border-radius: 5px;
  font-weight: bold;
  margin-bottom: 15px;
  transition: all 0.3s ease;
}

.post-link:hover {
  background-color: var(--primary-color);
  color: #fff;
}

.comment-count {
  font-size: 16px;
  font-weight: bold;
  color: var(--text-light);
  margin-top: 20px;
}

.dark .comment-count {
  color: var(--text-dark);
}

/* Loading Indicator */
.loading {
  text-align: center;
  font-size: 18px;
  color: #888;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .post-detail {
    margin: 20px;
    padding: 15px;
  }

  .post-title {
    font-size: 24px;
  }

  .post-content {
    font-size: 14px;
  }

  .post-link {
    font-size: 14px;
    padding: 8px 16px;
  }

  .comment-count {
    font-size: 14px;
  }
}
</style>
