const BASE_URL = 'https://hacker-news.firebaseio.com/v0';
const SEARCH_API_URL = 'https://hn.algolia.com/api/v1/search';




export const fetchSearchResults = async (query) => {

    try {
        const url = `${SEARCH_API_URL}?query=${encodeURIComponent(query)}&tags=story`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to fetch search results: ${response.statusText}`);
        }

        const data = await response.json();

        if (data && data.hits) {
            return data.hits;
        } else {
            throw new Error('No results found');
        }
    } catch (error) {
        console.error('Error fetching search results:', error.message);
        throw error;
    }
};

export const fetchPostDetails = async (id) => {
    try {
        const url = `${BASE_URL}/item/${id}.json`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch post details for ID: ${id}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching details for ID ${id}: ${error.message}`);
        throw error;
    }
};
export const fetchStories = async (route) => {
    const type = route === "/new" ? "newstories" :
        route === "/top" ? "topstories" :
            route === "/best" ? "beststories" :
                route === "/ask" ? "askstories" :
                route === "/show" ? "showstories" :
                route === "/jobs" ? "jobstories" :
                    "topstories";
    const url = `${BASE_URL}/${type}.json`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Failed to fetch stories: ${response.statusText}`);
    }

    const ids = await response.json();
    return ids;
};
