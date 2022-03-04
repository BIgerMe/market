import router from '@/router'
import store from '@/store'
import getPageTitle from '@/utils/pageTitle'
import {
  authentication,
  loginInterception,
  routesWhiteList,
  loginPath,
} from '@/config'

router.beforeResolve(async (to, from, next) => {

  let hasToken = store.getters['user/accessToken']
  if (hasToken) {
    if (!store.getters['user/username']) {
      await store.dispatch('user/getUserInfo')
    }
    if(store.getters['routes/routes'].length === 0){
      let accessRoutes = await store.dispatch('routes/setRoutes', permissions)
      console.log(accessRoutes)

      accessRoutes.forEach((item) => {
        router.addRoute(item)
      })
      next({ ...to, replace: true })
    }else{
      next()
    }
    // await store.dispatch('user/resetAccessToken')
  } else {
    const hasPermissions = store.getters['user/permissions'] && store.getters['user/permissions'].length > 0
    if(!hasPermissions){
      let permissions
      await store.dispatch('user/setPermissions', ['admin'])
      permissions = ['admin']
      let accessRoutes = await store.dispatch('routes/setRoutes', permissions)
      accessRoutes.forEach((item) => {
        router.addRoute(item)
      })
      next({ ...to, replace: true })
    }else{
      if (loginPath.indexOf(to.path) !== -1) {
        next(`/login?redirect=${to.path}`)
      } else {
        next()
      }
    }
  }
  if(to.path.indexOf('/blog/detail') == -1){
    document.title = getPageTitle(to.meta.title)
  }
})

router.afterEach(() => {
})
