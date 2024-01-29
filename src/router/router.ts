import { createRouter, createWebHistory } from "vue-router";

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "main",
            component: () => import("../views/VMain.vue"),
        },
        {
            path: "/chat",
            name: "chat",
            component: () => import("../views/VChat.vue"),
        },
    ],
});
