import { defineStore } from "pinia";
import { ref } from "vue";
import {fetchStories, fetchPostDetails, fetchSearchResults} from "@/services/apiService";


export const useStore = defineStore("posts", () => {
    const stories = ref([]);
    const allStoryIds = ref([]);
    const loading = ref(false);
    const error = ref(null);
    const currentPage = ref(1);
    const itemsPerPage = ref(20);
    const postDetails = ref(null);
    const searchResults = ref([]);



    const searchForPosts = async (query) => {
        loading.value = true;
        error.value = null;

        try {
            const results = await fetchSearchResults(query);

            if (results && results.length > 0) {
                searchResults.value = results.map(item => ({
                    id: item.objectID,
                    title: item.title || "Untitled",
                    by: item.author || "Unknown",
                    time: Math.floor(new Date(item.created_at).getTime() / 1000),
                    descendants: item.num_comments || 0,
                }));

            } else {
                error.value = "No results found.";
            }
        } catch (error) {
            console.error("Error fetching posts:", error);
            error.value = error.message || "Failed to fetch posts.";
        } finally {
            loading.value = false;
        }
    };






    const loadStories = async (routePath) => {
        loading.value = true;
        error.value = null;

        try {
            const storyIds = await fetchStories(routePath);
            allStoryIds.value = storyIds;

            const startIdx = (currentPage.value - 1) * itemsPerPage.value;
            const endIdx = startIdx + itemsPerPage.value;
            const pagedStoryIds = storyIds.slice(startIdx, endIdx);

            const details = await Promise.all(
                pagedStoryIds.map((id) => fetchPostDetails(id))
            );

            stories.value = details;
        } catch (err) {
            error.value = err.message;
        } finally {
            loading.value = false;
        }
    };
    const loadPostDetails = async (postId) => {
        loading.value = true;
        error.value = null;

        try {
            const details = await fetchPostDetails(postId);
            postDetails.value = details;
        } catch (err) {
            error.value = err.message;
        } finally {
            loading.value = false;
        }
    };
    const nextPage = () => {
        if (currentPage.value * itemsPerPage.value < allStoryIds.value.length) {
            currentPage.value++;
            loadStories();
        }
    };

    const prevPage = () => {
        if (currentPage.value > 1) {
            currentPage.value--;
            loadStories();
        }
    };


    const resetPagination = () => {
        currentPage.value = 1;
    };

    return {
        stories,
        loading,
        error,
        currentPage,
        itemsPerPage,
        allStoryIds,
        loadStories,
        nextPage,
        prevPage,
        resetPagination,
        loadPostDetails,
        postDetails,
        searchForPosts,
        searchResults
    };
});
