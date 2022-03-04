/**
 * @author chuzhixin 1204505056@qq.com （不想保留author可删除）
 * @description router全局配置，如有必要可分文件抽离，其中asyncRoutes只有在intelligence模式下才会用到，vip文档中已提供路由的基础图标与小清新图标的配置方案，请仔细阅读
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layouts'
import { publicPath, routerMode } from '@/config'

Vue.use(VueRouter)
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
  },
  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true,
  },
  {
    path: '/401',
    name: '401',
    component: () => import('@/views/401'),
    hidden: true,
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404'),
    hidden: true,
  },
]

export const asyncRoutes = [
  {
    path: '/blog',
    component: Layout,
    redirect: '/index',
    meta: {
      title: '文章',
    },
    children: [
      {
        path: 'index',
        name: 'Blog',
        component: () => import('@/views/blog/index'),
        meta: {
          title: '主页',
          affix: true,
        },
      },
      {
        path: 'detail/:id',
        name: 'BlogDetail',
        hidden: true,
        component: () => import('@/views/blog/detail'),
        meta: {
          title: '文章详情',
        },
      },
      {
        path: 'self',
        name: 'BlogSelf',
        hidden: true,
        component: () => import('@/views/blog/self'),
        meta: {
          title: '我的文章',
        },
      },
      {
        path: 'create',
        name: 'CreateBlog',
        hidden: true,
        component: () => import('@/views/blog/create'),
        meta: {
          title: '写新文章',
        },
      },
      {
        path: 'update/:id',
        name: 'UpdateBlog',
        hidden: true,
        component: () => import('@/views/blog/update'),
        meta: {
          title: '更新文章',
        },
      },
    ],
  },

  {
    //@todo 暂时用后台的layout，后续优化成前台的层次
    path: '/shopping',
    // component: () => import('@/layouts/frontend'),
    component: () => import('@/layouts/frontend'),
    redirect: '/shopping/index',
    name: 'shopping',
    hidden: true,
    meta: {
      title: '购物',
      icon: 'shopping',
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/shopping/index'),
        name: 'shopping_home',
        meta: { title: '商品', noCache: true },
      },
      {
        path: 'detail/:id',
        component: () => import('@/views/shopping/detail'),
        name: 'shopping_detail',
        meta: { title: '商品详情', noCache: true },
      },
    ],
  },
  {
    path: '/',
    component: Layout,
    redirect: '/blog/index',
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/index/index'),
        meta: {
          title: '导航',
          icon: 'home',
        },
      },
      {
        path: 'baby',
        name: 'Baby',
        hidden: true,
        component: () => import('@/views/baby/index'),
        meta: {
          title: '小棉袄',
        },
      },
    ],
  },
  {
    path: '/shopping_admin',
    component: Layout,
    redirect: 'noRedirect',
    name: 'shopping',
    // hidden: 'hidden',
    meta: {
      title: '商品管理',
    },
    children: [
      {
        path: 'goods',
        component: () => import('@/views/shopping_admin/goods'),
        name: 'shopping_goods',
        meta: { title: '商品管理', noCache: true },
      },{
        path: 'goods_add',
        component: () => import('@/views/shopping_admin/goods_add'),
        name: 'shopping_goods_add',
        hidden: 'hidden',
        meta: { title: '商品添加', noCache: true },
      },
    ],
  },
  {
    path: '/stock',
    component: Layout,
    redirect: 'noRedirect',
    name: 'stock',
    // hidden: 'hidden',
    meta: {
      title: '金融信息',
      icon: 'chart',
    },
    children: [
      {
        path: 'stock-basic',
        component: () => import('@/views/stock/stock-basic'),
        name: 'StockBasic',
        meta: { title: '股票基础信息', noCache: true },
      },
      {
        path: 'share-float',
        component: () => import('@/views/stock/share-float'),
        name: 'ShareFloat',
        meta: { title: '限售股解禁', noCache: true },
      },
      {
        path: 'stock-detail/:ts_code',
        component: () => import('@/views/stock/stock-detail'),
        name: 'StockDetail',
        hidden: true,
        meta: { title: '股票详情页', icon: 'detail', noCache: true },
      },
    ],
  }, {
    path: '/three',
    component: Layout,
    redirect: 'noRedirect',
    name: 'three',
    meta: {title: '3D展示'},
    children: [
      {
        path: 'one',
        component: () => import('@/views/three/one'),
        name: 'one',
        meta: {title: '小凤凰'}
      },
      {
        path: 'two',
        component: () => import('@/views/three/two'),
        name: 'two',
        hidden:true,
        meta: { title:'平面'}
      }
    ],
  },
  {
    //@todo 暂时用后台的layout，后续优化成前台的层次
    path: '/other',
    component: () => import('@/layouts/frontend'),
    hidden: true,
    meta: {
      title: '了解站长',
    },
    children: [
      {
        path: 'resume',
        name: 'resume',
        component: () => import('@/views/index/resume'),
        meta: {
          title: '认识我',
        },
      },
      {
        path: 'resume_en',
        name: 'resume_en',
        component: () => import('@/views/index/resume_en'),
        meta: {
          title: 'know me',
        },
      },
    ],
  },
]

const router = new VueRouter({
  base: publicPath,
  mode: routerMode,
  scrollBehavior: () => ({
    y: 0,
  }),
  routes: constantRoutes,
})

export function resetRouter() {
  location.reload()
}

export default router
