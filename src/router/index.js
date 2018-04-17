import Vue from 'vue'
import Router from 'vue-router'

// read more about lazy loading router : https://router.vuejs.org/en/advanced/lazy-loading.html
const Home = () => import(/* webpackChunkName: "home" */ 'pages/Home.vue')
const Detail = () => import(/* webpackChunkName: "detail" */ 'pages/Detail.vue')
const Category = () => import(/* webpackChunkName: "category" */ 'pages/Category.vue')

Vue.use(Router)

var router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/post/:slug',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/category/:category',
      name: 'Category',
      component: Category
    }
  ]
})
router.afterEach((to, from) => {
  window.scrollTo(0, 0)
})
export default router
