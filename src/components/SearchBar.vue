<template>
  <div className="search-bar">
    <input
        v-model="query"
        @input="debouncedSearch"
        placeholder="Search"
        class="search-input"
    />
  </div>
</template>

<script>
import {ref} from "vue";
import {useRouter} from "vue-router";
import {debounce} from "lodash";

export default {
  setup() {
    const query = ref("");
    const router = useRouter();

    const debouncedSearch = debounce(() => {
      if (query.value) {
        router.push({path: "/search", query: {q: query.value}});
      } else {
        router.push({path: "/"});
      }
    }, 400);

    return {query, debouncedSearch};
  },
};
</script>

<style scoped>
.search-input {
  border: 1px solid #ddd;
  width: 250px;
  background-color: #f7f7f7;
  color: rgba(51, 51, 51, 0.63);
  transition: border-color 0.3s, box-shadow 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  outline: none;
}

.search-input:focus {
  border-color: #ff6600;
  box-shadow: 0 2px 6px rgba(255, 102, 0, 0.3);
}

.search-input::placeholder {
  color: #aaa;
}

.dark .search-input {
  background-color: rgba(101, 92, 92, 0.31);
  color: #fff;
  border-color: #444;
}

/* Responsive Styles for Search Input */
@media (max-width: 768px) {
  .search-input {
    width: 100%;
    margin-left: 0;
  }
}

@media (max-width: 480px) {
  .search-input {
    width: 100%;
    margin-left: 0;
  }
}
</style>
