<template lang='pug'>
  v-app
    v-navigation-drawer(persistent='' v-model='drawer' enable-resize-watcher='' fixed='' app='')
      v-list
        v-list-tile(value='true' v-for='(item, i) in items' :key='i' @click='openRoute(item.url)')
          v-list-tile-action
            v-icon(v-html='item.icon')
          v-list-tile-content
            v-list-tile-title(v-text='item.title')
    v-toolbar(app='' color='primary' dark='')
      v-toolbar-side-icon(@click.stop='drawer = !drawer')
      v-toolbar-title(v-text='title')
      v-spacer
    v-content
      router-view
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      drawer: true,
      items: [
        {
          icon: 'home',
          title: 'Home',
          url: '/',
        },
        {
          icon: 'library_books',
          title: 'Learn Chinese Vocabulary',
          url: '/learn-chinese-vocabulary',
        },
        {
          icon: 'translate',
          title: 'Learn Chinese Characters',
          url: '/learn-chinese-characters',
        },
      ],

      right: true,
      rightDrawer: false,
    }
  },
  computed: {
    title() {
      return this.$route.meta.title
    },
  },
  methods: {
    openRoute(url) {
      this.$router.push(url)
    },
  },
}
</script>
