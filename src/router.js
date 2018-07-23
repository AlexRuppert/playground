import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import LearnChinese from './views/LearnChinese.vue'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: 'Playground'
      }
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/learn-chinese',
      name: 'learnl-chinese',
      component: LearnChinese,
       meta: {
         title: 'Learn Chinese'
       }
    }
  ]
})