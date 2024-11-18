<template>
  <div className="comments">
    <Comment
        v-for="commentId in commentIds"
        :key="commentId"
        :commentId="commentId"
    />
  </div>
</template>

<script>
import Comment from "./Comment.vue";

export default {
  components: {Comment},
  props: {
    commentIds: {type: Array, required: true},
  },
};
</script>

