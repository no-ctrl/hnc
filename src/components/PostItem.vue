<template>
  <div class="post">
    <h3>
      <!-- Added route-link to display the title and navigate to the detail page -->
      <router-link :to="`/post/${postId}`">{{ post.title }}</router-link>
    </h3>
    <p class="meta">
      By <strong>{{ post.by }}</strong> | {{ formatDate(post.time) }} |
      {{ post.descendants || "No" }} comments
    </p>

  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  computed: {
    postId() {

      return this.post?.id || "unknown";
    },

  },
  methods: {

    formatDate(timestamp) {

      if (!timestamp) return "Unknown date";
      const date = new Date(timestamp * 1000);
      return date.toLocaleDateString();
    },
  },
};

</script>

<style scoped>
.status {
  font-size: 12px;
  margin-top: 5px;
  font-weight: bold;
}

.post {
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: background-color 0.2s ease;
}

.post:hover {
  background-color: #fafafa;
}

.post h3 {
  margin: 0;
  font-size: 18px;
  font-weight: bold;
  line-height: 1.4;
}

.post h3 a {
  text-decoration: none;
  color: #000; /* Black for link text */
  transition: color 0.2s ease;
}

.post h3 a:hover {
  color: #ff6600; /* Hacker News orange color on hover */
}

/* Meta data styling */
.post .meta {
  font-size: 14px;
  color: #777;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.post .meta strong {
  color: #000;
  font-weight: bold;
}

.post .meta span {
  white-space: nowrap; /* Prevent text wrapping */
}

/* Responsive design tweaks */
@media (max-width: 768px) {
  .post h3 {
    font-size: 16px; /* Slightly smaller font on medium screens */
  }

  .post .meta {
    font-size: 12px; /* Smaller font size for meta on smaller screens */
  }
}

@media (max-width: 480px) {
  .post {
    padding: 8px 0; /* Reduced padding for small screens */
  }

  .post h3 {
    font-size: 14px; /* Smaller post title on small screens */
  }

  .post .meta {
    flex-direction: column;
    font-size: 12px;
    gap: 4px;
  }
}
</style>
