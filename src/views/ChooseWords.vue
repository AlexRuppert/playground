<template lang='pug'>
  v-container(fluid grid-list-xs column fill-height)
    v-layout(row justify-center)
      v-flex(column d-block xs12 sm8 md6)
        v-card
          v-card-title
             v-select(label='Select Text' :items = 'texts' item-text='title' item-value='text' v-model='text')
             v-select(label='Select Rules' :items = 'rules' item-text='title' item-value='rule' v-model='rule')
        v-card
          v-card-title
            Cloze(:text='preparedText' ignore-case=true @correct='correct')
    v-dialog(v-model='dialogCorrect')
      v-card
        v-card-title.headline Correct!
        v-card-text You did it correctly!
        v-card-actions
          v-spacer
          v-btn(flat  @click='dialogCorrect=false') Dismiss
      
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Cloze from '@/components/Cloze.vue'
//@ts-ignore
import textsFile from '@/assets/data/german/texts.json'
@Component({ components: { Cloze } })
export default class ChooseWords extends Vue {
  text = ''
  rule = null
  dialogCorrect = false
  texts = textsFile
  rules = [
    {
      title: 'Der Die Das Ein',
      rule: /(\W(der(?=\s))|(die(?=\s))|(das(?=\s))|(ein(e?(e[srnm])?)(?=\s)))/gi,
    },
  ]
  get preparedText() {
    let text = this.text
    if (this.rule) {
      return text.replace(this.rule, '[[$1]]')
    }
    return 'no rule selected'
  }

  correct() {
    this.dialogCorrect = true
  }
}
</script>

<style lang="stylus" scoped>
</style>
