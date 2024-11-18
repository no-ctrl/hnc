<template>

  <div v-if="comment" class="comment">
    <div v-if="comment.text" class="comment-text" v-html="comment.text"></div>

    <div v-if="comment.by" class="comment-author">
      <span>By: <strong>{{ comment.by }}</strong></span>
    </div>

    <div v-if="hasNestedComments" class="nested-comments-toggle">
      <button @click="toggleNestedComments" class="toggle-btn">
        {{ showNestedComments ? 'Hide Replies' : 'Show Replies' }}
      </button>
    </div>

    <transition name="fade">
      <div v-if="showNestedComments && comment.kids?.length" class="nested-comments">
        <Comments :commentIds="comment.kids" />
      </div>
    </transition>

    <p v-if="error" class="error-message">Failed to load comment.</p>
  </div>
</template>

<script>
import { ref, onMounted, defineAsyncComponent } from "vue";
import { fetchPostDetails } from "../services/apiService.js";

const Comments = defineAsyncComponent(() => import("./Comments.vue"));

export default {
  components: { Comments },
  props: {
    commentId: { type: Number, required: true },
  },
  setup(props) {
    const comment = ref(null);
    const error = ref(false);
    const showNestedComments = ref(false);
    const hasNestedComments = ref(false);
    const isLoading = ref(true);

    onMounted(async () => {
      try {
        const data = await fetchPostDetails(props.commentId);
        if (data) {
          comment.value = data;
          hasNestedComments.value = !!data.kids?.length;
        }
      } catch {
        error.value = true;
      } finally {
        isLoading.value = false;
      }
    });

    const toggleNestedComments = () => {
      showNestedComments.value = !showNestedComments.value;
    };

    return { comment, error, showNestedComments, hasNestedComments, toggleNestedComments, isLoading };
  },
};
</script>

<style scoped>
.comment {
  margin-left: 20px;
  padding: 15px;
  border-left: 3px solid #ff6600;
  background: #fff;
  font-size: 14px;
  position: relative;
  transition: background 0.3s, border-color 0.3s;
}

.comment:hover {
  background: #f7f7f7;
  border-color: #ff5500;
}

.comment-author {
  font-size: 13px;
  color: #666;
  margin-top: 8px;
}

.comment-author strong {
  color: #333;
}

.nested-comments-toggle {
  margin-top: 10px;
}

.toggle-btn {
  background: none;
  border: none;
  color: #ff6600;
  cursor: pointer;
  font-size: 13px;
  font-weight: bold;
  transition: color 0.3s ease;
}

.toggle-btn:hover {
  color: #ff5500;
}

.nested-comments {
  margin-top: 10px;
  padding-left: 20px;
}

.loading {
  font-size: 14px;
  color: #888;
  text-align: center;
}

.error-message {
  font-size: 14px;
  color: red;
  text-align: center;
  font-weight: bold;
}


@media (max-width: 768px) {
  .comment {
    padding: 10px;
    margin-left: 10px;
  }

  .comment-text {
    font-size: 13px;
  }

  .comment-author {
    font-size: 12px;
  }

  .toggle-btn {
    font-size: 12px;
  }
}
</style>
