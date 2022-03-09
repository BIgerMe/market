/**
 * @author zhangxiaoming
 */

import { createRouter,createWebHashHistory} from "vue-router";

import Layout from '@/layouts'

const routes = [
    {
        path: "/",
        redirect: "/shopping/index",
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
        redirect: "/shopping/index",
        component:Layout,
        children:[
            {
                path: 'index',
                name: 'm_home',
                component: () => import('@/views/shopping'),
                meta: {
                    title: '商品首页',
                },
            },{
                path: 'detail/:id',
                name: 'g_detail',
                component: () => import('@/views/shopping/detail'),
                meta: {
                    title: '商品详情',
                },
            },
        ]
    },
]

const router = new createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
