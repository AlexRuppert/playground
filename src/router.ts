import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  //mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        icon: 'home',
        title: 'Home',
      },
    },
    {
      path: '/derdiedasgame',
      name: 'derdiedasgame',
      component: () =>
        import(/* webpackChunkName: "derdiedasgame" */ './views/DerDieDasGame.vue'),
      meta: {
        icon: 'chat',
        title: 'Der Die Das - Game',
      },
    },
    {
      path: '/choosewords',
      name: 'choosewords',
      component: () =>
        import(/* webpackChunkName: "choosewords" */ './views/ChooseWords.vue'),
      meta: {
        icon: 'playlist_add_check',
        title: 'Choose Words',
      },
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
  ],
})
