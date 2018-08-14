import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import LearnChineseCharacters from './views/LearnChineseCharacters.vue'
import LearnChineseVocabulary from './views/LearnChineseVocabulary.vue'

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
      path: '/learn-chinese-characters/:character?',
      name: 'learn-chinese-characters',
      component: LearnChineseCharacters,
      props: true,
      meta: {
        title: 'Learn Chinese Characters'
      }
    },
    {
      path: '/learn-chinese-vocabulary',
      name: 'learn-chinese-vocabulary',
      component: LearnChineseVocabulary,
      meta: {
        title: 'Learn Chinese Vocabulary'
      }
    }
  ]
})