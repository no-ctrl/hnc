import { createRouter, createWebHistory } from 'vue-router';

import Stories from "@/pages/Stories.vue";

import NotFound from "@/pages/NotFound.vue";
import PostDetails from "@/pages/PostDetails.vue";
import SearchResults from "@/pages/SearchResults.vue";

const routes = [
    { path: '/', component: Stories },
    { path: '/post/:id', component: PostDetails },
    { path: '/search', component: SearchResults },
    { path: '/top', component: Stories },
    { path: '/new', component: Stories },
    { path: '/best', component: Stories },
    { path: '/ask', component: Stories },
    { path: '/show', component: Stories },
    { path: '/jobs', component: Stories },
    { path: '/:pathMatch(.*)*', component: NotFound }
];


const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
