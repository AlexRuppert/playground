<template lang='pug'>
  v-container(fluid grid-list-xs column fill-height)
    v-layout(row justify-center)
      v-flex(column d-block xs12 sm8 md6)
        v-card.mb-3
          v-card-title
            v-select.mx-2(label='Select Text' :items = 'texts' item-text='title' item-value='text' v-model='text')
            v-select.mx-2(label='Select Rules' :items = 'rules' item-text='title' item-value='rule' v-model='rule')
          v-expansion-panel(expand)
            v-expansion-panel-content
              template(slot='header')
                div.caption Custom Settings
              v-card
                v-card-text
                  v-textarea(label='Your Text' v-model='text.content')
        v-card
          v-card-title
            Cloze(:text='preparedText' ignore-case=true @correct='correct')
          v-card-text.mt-4.caption(v-if='text.license')
            span This is an excerpt from 
            a(:href='text.license.source') {{text.license.work}}
            span  by {{text.license.author}}
            span  published under 
            a(:href='text.license.href') {{text.license.title}}
            span .

    v-dialog(v-model='dialogCorrect')
      v-card
        v-card-title.headline Correct!
        v-card-text Awesome, you did it!
        v-card-actions
          v-spacer
          v-btn(flat @click='dialogCorrect=false') Dismiss
      
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Cloze from '@/components/Cloze.vue'
//@ts-ignore
import textsFile from '@/assets/data/german/texts.json'
@Component({ components: { Cloze } })
export default class ChooseWords extends Vue {
  text = {
    content: '',
  }
  rule = null
  dialogCorrect = false
  texts = textsFile
  rules = [
    {
      title: 'Der Die Das Ein',
      rule: '\\W(der|die|das|de[msn]|ein(e?[srnm]?))(?=\\s)',
    },
    {
      title: 'Haben Sein',
      rule:
        '\\W(hab(e?n?)|h[aä]t(ten?)?|ha[sb]t|ist|bin|sind|waren|werden|sei[nd]|bist|war(s?t)?)(?=\\s)',
    },
  ]
  get preparedText() {
    //@ts-ignore
    let text = this.text.content
    if (this.rule) {
      return text.replace(new RegExp(this.rule, 'gi'), '[[$1]]')
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
