<template lang="pug">
  v-card
    v-card-title.character-card
      .pinyin(v-html='pinyin')
      v-btn.sound(flat icon color='pink' @click='playSound(character)')
        v-icon volume_up
      .character.sans-serif {{character}}
      .translation {{translation}}
      .radical-container(column)
        .radical.sans-serif(v-for='radical in radicals')
          v-tooltip(top)
            span(slot='activator') {{radical.radical}}
            .text-xs-center {{radical.pinyin2}}
            .text-xs-center {{radical.definitions[0]}}
</template>

<script>
import axios from 'axios'
import tss from '../../shared/tss'
export default {
  name: 'character-card',
  store: [],
  props: {
    character: String,
  },
  data() {
    return {
      hanzi: {
        character: '',
        components: [],
        translations: [],
      },
    }
  },
  computed: {
    pinyin() {
      try {
        const raw = this.hanzi.translations[0].pinyin2
        return this.colorizePinyin(raw)
      } catch (error) {
        return ''
      }
    },
    radicals() {
      try {
        return this.hanzi.components.filter(r => r.radical.indexOf('No') < 0)
      } catch (err) {
        return ''
      }
    },
    translation() {
      try {
        let translations = this.hanzi.translations
        translations = translations.filter(t => t.definitions[0].indexOf('surname') < 0)
        let definition = translations[0].definitions
          .filter(d => d.indexOf('CL:') < 0)
          .slice(0, 2)
          .join('; ')
        return definition
      } catch (error) {
        return 'Unknown'
      }
    },
  },
  watch: {
    character: function(newVal, oldVal) {
      this.lookUpCharacter()
    },
  },
  methods: {
    lookUpCharacter() {
      if (this.character) {
        ;(async () => {
          const result = (await axios.get(
            'http://localhost:5001/hanzi/characters/' + this.character,
          )).data
          this.hanzi = result[this.character]
        })()
      }
    },
    async playSound(character) {
      tss.chinese(character)
    },
    colorizePinyin(text) {
      return text
        .replace(/[āɑ̄ēīōūǖĀĒĪŌŪǕ]/g, '<span class="tone t1">$&</span>')
        .replace(/[áɑ́éíóúǘÁÉÍÓÚǗ]/g, '<span class="tone t2">$&</span>')
        .replace(/[ǎɑ̌ěǐǒǔǚǍĚǏǑǓǙ]/g, '<span class="tone t3">$&</span>')
        .replace(/[àɑ̀èìòùǜÀÈÌÒÙǛ]/g, '<span class="tone t4">$&</span>')
    },
  },
  beforeMount() {
    this.lookUpCharacter()
  },
}
</script>
<style lang="scss">
.margin {
  margin: 10px;
}

.pinyin {
  .tone {
    font-weight: 600;
    position: relative;
    padding: 0 2px;
    &::before {
      position: absolute;
      content: '4';

      bottom: 80%;
      font-size: 12px;
      left: 25%;
      right: 25%;
    }
    &.t1 {
      color: #0059ff;
      &::before {
        content: '1';
      }
    }
    &.t2 {
      color: #f00;
      &::before {
        content: '2';
      }
    }
    &.t3 {
      color: #00830b;
      &::before {
        content: '3';
      }
    }
    &.t4 {
      color: #f700ff;
      &::before {
        content: '4';
      }
    }
  }
}
</style>

<style scoped lang="scss">
.character-card {
  min-width: 300px;
  display: grid;
  grid-template-columns: 3fr 20px 1fr;
  grid-template-rows: 1fr auto 1fr;
  grid-template-areas:
    'pinyin spacer sound'
    'hanyin spacer radical'
    'translation spacer radical';
  justify-items: center;
  padding: 10px;
}
.tone4 {
  font-weight: 600;
  color: #f00;
}
.pinyin {
  font-size: 20px;
  grid-area: pinyin;
}
.radical-container {
  justify-items: center;
  grid-area: radical;
}
.radical {
  font-size: 16px;
}

.sound {
  grid-area: sound;
}
.sans-serif {
  font-family: Georgia, 'Times New Roman', 'Microsoft YaHei', 微软雅黑, STXihei, 华文细黑, serif;
}
.character {
  font-size: 60px;
  grid-area: hanyin;
}
.translation {
  grid-area: translation;
  max-width: 170px;
}
</style>
