<template  lang='pug'>
  v-container(fluid grid-list-lg)
    v-layout(row wrap)
      v-flex(xs12)
        v-card
          v-card-title(primary-title)
            .display-4 Enjoy! 😉
          v-card-text
            .headline Open the menu on the right.
             
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { useStore } from 'vuex-simple'

import { Store } from '@/store/store'
@Component
export default class Home extends Vue {}
</script>
