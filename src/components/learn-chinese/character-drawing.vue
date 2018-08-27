<template lang="pug">
  .writer-container
    .character(ref='container' @click='startAidedQuiz')
    .controls
      v-btn.aided(flat icon color='accent' @click='reset')
        v-icon visibility
      v-btn.blind(flat icon color='accent' @click='startBlindQuiz')
        v-icon visibility_off
</template>

<script>
import pinyin from '@/components/learn-chinese/pinyin.vue'
export default {
  name: 'character-drawing',
  store: [],
  props: {
    character: String,
    pinyin: String,
  },
  components: {
    pinyin,
  },
  data() {
    return {
      writer: {},
      trySelf: false,
      blind: false,
    }
  },
  computed: {},
  watch: {
    character: function(newVal, oldVal) {
      this.lookUpCharacter()
    },
  },
  methods: {
    lookUpCharacter() {
      try {
        if (character) {
          this.writer.setCharacter(this.character)
        }
        this.reset()
      } catch (err) {}
    },
    startAidedQuiz() {
      this.writer.showOutline()
      this.writer.quiz()
    },
    startBlindQuiz() {
      this.writer.hideOutline()
      this.writer.quiz()
    },
    reset() {
      this.writer.showOutline()
      this.writer.loopCharacterAnimation()
    },
  },
  mounted() {
    if (this.character) {
      this.writer = new HanziWriter(this.$refs['container'], this.character, {
        width: 250,
        height: 250,
        padding: 5,
        radicalColor: '#168F16',
        showOutline: true,
        strokeAnimationSpeed: 1,
        delayBetweenStrokes: 10,
        delayBetweenLoops: 3000,
        onLoadCharDataError: () => {},
      })
      this.writer.loopCharacterAnimation()
    }
  },
}
</script>
<style lang="scss" scoped>
.writer-container {
  width: 100%;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 35px;
  grid-template-areas:
    'character'
    'controls';
  justify-items: center;

  .pinyin {
    grid-area: pinyin;
  }
  .character {
    grid-area: character;
  }
  .controls {
    grid-area: controls;
  }
}
</style>
