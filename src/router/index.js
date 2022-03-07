/**
 * @author zhangxiaoming
 */

import { createRouter,createWebHashHistory} from "vue-router";

import Layout from '@/layouts'

const routes = [
    {
        path: "/",
        redirect: "/index",
        component:Layout,
        children:[
            {
                path: 'index',
                name: 'index',
                component: () => import('@/views/index/index'),
                meta: {
                    title: '主页',
                },
            }
        ]
    },
    {
        path: "/login",
        name: "login",
        component: () => import('@/views/login'),
    },
    {
        path: "/shopping",
        name: "shopping",
        component: () => import('@/views/shopping'),
    },
]

const router = new createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
