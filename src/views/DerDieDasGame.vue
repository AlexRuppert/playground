<template  lang='pug'>
  v-container(fluid grid-list-xs column fill-height)
    v-layout(row justify-center)
      v-flex(column d-block xs12 sm8 md6)
        v-card
          v-card-title.title
            v-flex(xs6)
              span Points
            v-flex.text-xs-right.display-2(xs6)
              number(
              ref='points'
              :from='0'
              :to='points'
              :duration='0.5'
              easing='Power1.easeOut')
        v-card
          v-card-title
            v-sparkline(
              :value='pointsHistory'
              :gradient='["#03A9F4","#f76747"]'
              height=50
              :smooth=15
              :padding=1
              type='bars'
              :line-width=3
              stroke-linecap='round'
              gradient-direction='top'
              auto-draw
              auto-line-width
              )
        v-card.mt-5.quiz-card
          v-card-title.display-1.py-5.quiz-question.break-words
            v-layout(justify-center)
              v-flex.text-xs-right.text-capitalize.quiz-solution(xs3 pr-4) {{solution}}
              v-flex(xs9 pl-4) {{currentWord.german}}
                div.caption {{currentWord.english}}
          v-card-actions
              v-layout()
                v-btn(block large color="orange" flat @click='select("der")') Der
                v-btn(block large color="green" flat @click='select("die")') Die
                v-btn(block large color="blue" flat @click='select("das")') Das
       
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { useStore } from 'vuex-simple'
import { Store } from '@/store/store'
import { delay } from 'helpful-decorators'
//@ts-ignore
import nouns from '@/assets/data/german/nouns.json'

@Component
export default class DerDieDasGame extends Vue {
  public correctnessColor = '#333'
  public store: Store = useStore(this.$store)
  public points = 0
  public pointsHistory = Array.apply(null, Array(20)).map(_ => 0)
  public wordList = nouns
  public currentWordIndex = 0
  public showSolution = false

  // public bar?: FooModule = useModule(this.$store, ['bar', 'foo1'])
  public get readState() {
    // access state like a property
    return this.store.derDieDasGame.counter
  }

  public updatePoints(val) {
    this.points += val
    this.pointsHistory.push(val)
    this.pointsHistory.shift()
  }
  public mounted() {
    this.shuffle()
  }
  public get currentWord() {
    return this.wordList[this.currentWordIndex]
  }
  public get solution() {
    return this.showSolution ? this.currentWord.article : ''
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
    if (this.showSolution) return
    this.showSolution = true
    //@ts-ignore
    this.$anime.timeline().add({
      targets: '.quiz-solution',
      translateX: [-50, 0],
      opacity: [0, 1],
      delay: 0,
      duration: 200,
    })
    const correct = this.isCorrect(option, this.currentWord.article)
    if (correct) {
      this.updatePoints(100)
    } else {
      this.updatePoints(-200)
    }
    //@ts-ignore
    let animation = this.$anime
      .timeline()
      .add({
        targets: '.quiz-card',
        background: correct ? '#afa' : '#faa',
        delay: 0,
        duration: 300,
      })
      .add({
        targets: '.quiz-card',
        background: '#fff',
        delay: 500,
        duration: 200,
      })
    await animation.finished
    //@ts-ignore
    animation = this.$anime.timeline().add({
      targets: '.quiz-question',
      translateX: [0, 100],
      opacity: 0,
      delay: 0,
      duration: 500,
    })
    await animation.finished
    this.showSolution = false
    this.incWord()
    //@ts-ignore
    animation = this.$anime.timeline().add({
      targets: '.quiz-question',
      translateX: [-100, 0],
      opacity: 1,
      delay: 0,
      duration: 500,
    })
  }
}
</script>

<style lang="stylus" scoped>
.break-words {
  word-break: break-all;
}
</style>
