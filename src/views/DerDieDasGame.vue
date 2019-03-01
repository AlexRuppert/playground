<template  lang='pug'>
  v-container(fluid grid-list-xs fill-height)
    v-layout(row wrap justify-center)
      v-flex(d-flex xs12 sm8 md6)
        v-card
          v-layout(column d-flex fill-height)
            v-flex(shrink)
              v-card-title.title(primary) Guess the Article
            v-flex(grow fill-height pt-5)
              v-card-text.display-2
                v-layout()
                  v-flex.text-xs-right.font-weight-black.text-capitalize(xs2 pr-4) der
                  v-flex(xs10 pl-4) {{currentWord.word}}
            v-flex(shrink)
              v-card-actions
                v-layout()
                  v-btn(block large dark @click='select("der")') Der
                  v-btn(block large dark @click='select("die")') Die
                  v-btn(block large dark @click='select("das")') Das
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { useStore } from 'vuex-simple'
import { Store } from '@/store/store'
import { delay } from 'helpful-decorators'

@Component
export default class DerDieDasGame extends Vue {
  public correctnessColor = '#333'
  public store: Store = useStore(this.$store)

  public wordList = [
    { article: 'der', word: 'Bauer' },
    { article: 'die', word: 'Laute' },
    { article: 'das', word: 'Meisterwerk' },
  ]
  public currentWordIndex = 0

  // public bar?: FooModule = useModule(this.$store, ['bar', 'foo1'])
  public get readState() {
    // access state like a property
    return this.store.derDieDasGame.counter
  }

  public get currentWord() {
    return this.wordList[this.currentWordIndex]
  }
  public incWord() {
    this.currentWordIndex++
    if (this.currentWordIndex >= this.wordList.length) {
      this.currentWordIndex = 0
      this.shuffle()
    }
  }
  public shuffle() {
    let copy = this.wordList.slice()
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[copy[i], copy[j]] = [copy[j], copy[i]]
    }
    this.wordList = copy
  }
  public reset() {
    this.currentWordIndex = 0
    this.shuffle()
  }
  public isCorrect(option, word) {
    return option.toLowerCase() === word.toLowerCase()
  }
  async select(option: any) {
    if (this.isCorrect(option, this.currentWord.article)) {
    } else {
    }
    this.incWord()
  }
}
</script>

<style lang="stylus" scoped>
</style>
