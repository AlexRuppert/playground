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
  items = []
  right = true
  rightDrawer = false
  mounted() {
    //@ts-ignore
    let routes = this.$router.options.routes
    routes = routes.filter(r => r.meta && r.meta.title)
    this.items = routes.map(r => {
      return { icon: r.meta.icon || 'done', title: r.meta.title, url: r.path }
    })
  }

  get title() {
    return this.$route.meta.title
  }
  openRoute(url: string) {
    this.$router.push(url)
  }
}
</script>