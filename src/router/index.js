/**
 * @author zhangxiaoming
 */

import { createRouter,createWebHashHistory} from "vue-router";

// import Layout from '@/layouts'

const routes = [
    { path: "/", redirect: "/login" },
    {
        path: "/login",
        name: "login",
        component: () => import('@/views/login/index'),
    },
    {
        path: "/shopping",
        name: "shopping",
        component: () => import('@/views/shopping/index'),
    },
]

const router = new createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
