<template lang="pug">
  v-card.margin
    v-card-title.character-card
      .pinyin(v-html='pinyin')
      v-btn.sound(flat icon color='pink' @click='playSound(character)')
        v-icon volume_up
      .character.sans-serif {{character}}
      .translation {{translation}}
      .radical-container(column)
        .radical.sans-serif(v-for='radical in radicals') {{radical}}
</template>

<script>
import pinyinConvert from 'pinyin-tone-convert'
import hanzi from 'hanzi'
import tss from '../../shared/tss'
export default {
  name: 'character-card',
  store: ['hanzi'],
  props: {
    character: String,
  },
  data() {
    return {}
  },
  computed: {
    pinyin() {
      try {
        const raw = pinyinConvert(this.hanzi.getPinyin(this.character)[0] || '')
        if (raw === '_number') {
          return ''
        }
        return this.colorizePinyin(raw)
      } catch (error) {
        return ''
      }
    },
    radicals() {
      try {
        return this.hanzi
          .decompose(this.character)
          .components2.map(r => r.replace('No glyph available', '**'))
      } catch (err) {
        return ''
      }
    },
    translation() {
      try {
        let definitions = this.hanzi.definitionLookup(this.character)
        definitions = definitions.filter(d => d.definition.indexOf('surname') < 0)
        let definition = definitions[0].definition
          .split('/')
          .filter(d => d.indexOf('CL:') < 0)
          .slice(0, 2)
          .join('; ')
        return definition
      } catch (error) {
        return 'Unknown'
      }
    },
  },
  methods: {
    initHanzi() {
      if (!this.hanzi) {
        this.hanzi = hanzi
        this.hanzi.start()
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
    this.initHanzi()
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
  padding: 25px;
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
