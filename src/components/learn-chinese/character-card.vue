<template lang="pug">
  v-card.full-width
    v-card-title.character-card
      pinyin.pinyin(:pinyin='pinyin')
      .controls
        v-btn(flat icon color='primary' @click='write')
          v-icon {{writing?'undo':'translate'}}
        v-btn(flat icon color='primary' @click='playSound')
          v-icon volume_up
        v-btn(flat icon color='primary' @click='toggleSerif')
          v-icon text_fields
      .character
        caracter-drawing(v-if='writing' :character='character' :pinyin='pinyin')
        .huge(v-else :class='{"sans-serif": !serif}') {{character}}
      .translation(v-if='!writing') {{translation}}
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
import pinyin from '@/components/learn-chinese/pinyin.vue'
import caracterDrawing from '@/components/learn-chinese/character-drawing.vue'
import HanziWriter from 'hanzi-writer'

export default {
  name: 'character-card',
  store: [],
  props: {
    character: String,
  },
  components: {
    pinyin,
    caracterDrawing,
  },
  data() {
    return {
      hanzi: {
        character: '',
        components: [],
        translations: [],
      },
      writing: false,
      serif: false,
    }
  },
  computed: {
    pinyin() {
      try {
        return this.hanzi.translations[0].pinyin2
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
            (process.env.NODE_ENV === 'development'
              ? 'http://localhost:5001/hanzi/characters/'
              : 'http://hanzi-service.fr.openode.io/hanzi/characters/') + this.character,
          )).data
          this.hanzi = result[this.character]
        })()
      }
    },
    write() {
      this.writing = !this.writing
    },
    toggleSerif() {
      this.serif = !this.serif
    },
    async playSound() {
      tss.chinese(this.character)
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
</style>

<style scoped lang="scss">
.full-width {
  width: 100%;
}
.character-card {
  width: 100%;
  display: grid;
  grid-template-columns: 35px 3fr 35px;
  grid-template-rows: 60px auto 1fr;
  grid-template-areas:
    'radical pinyin controls'
    'radical hanyin controls'
    'radical translation controls';
  justify-items: center;
  align-items: center;
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

.controls {
  grid-area: controls;
  align-self: start;
}
.sans-serif {
  font-family: Georgia, 'Times New Roman', 'Microsoft YaHei', 微软雅黑, STXihei, 华文细黑, serif;
}

.huge {
  font-size: 80px;
}
.character {
  grid-area: hanyin;
  width: 100%;
  text-align: center;
}
.translation {
  grid-area: translation;
  max-width: 300px;
}
</style>
