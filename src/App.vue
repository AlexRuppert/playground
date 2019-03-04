<template lang='pug'>
  v-app
    v-navigation-drawer(persistent='' v-model='drawer' enable-resize-watcher fixed app)
      v-list
        v-list-tile(value='true' v-for='(item, i) in items' :key='i' @click='openRoute(item.url)')
          v-list-tile-action
            v-icon(v-html='item.icon')
          v-list-tile-content
            v-list-tile-title(v-text='item.title')
    v-toolbar(app color='primary' dark absolute dense)
      v-toolbar-side-icon(@click.stop='drawer = !drawer')
      v-toolbar-title(v-text='title')
      v-spacer
    v-content
      router-view#router
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
@Component
export default class App extends Vue {
  name = 'App'
  drawer = true
  items = [
    {
      icon: 'home',
      title: 'Home',
      url: '/',
    },
    {
      icon: 'chat',
      title: 'Der Die Das - Game',
      url: '/derdiedasgame',
    },
  ]
  right = true
  rightDrawer = false

  get title() {
    return this.$route.meta.title
  }
  openRoute(url: string) {
    this.$router.push(url)
  }
}
</script>