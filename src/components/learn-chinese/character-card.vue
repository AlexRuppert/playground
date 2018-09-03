<template lang="pug">
  v-card.full-width
    v-card-title.character-card
      pinyin.pinyin(:pinyin='pinyin' size='20')
      .controls
        v-btn(flat icon color='primary' @click='write')
          v-icon {{writing?'undo':'translate'}}
        v-btn(flat icon color='primary' @click='playSound')
          v-icon volume_up
        v-btn(flat icon color='primary' @click='toggleSerif')
          v-icon text_fields
      .character
        caracter-drawing(v-if='writing' :character='character' :pinyin='pinyin')
        .huge(v-else :class='{"sans-serif": !serif, serif: serif}') {{character}}
      .translation(v-if='!writing')
        v-expansion-panel.no-shadow
          v-expansion-panel-content(ripple)
            div(slot='header') {{translation}}
            v-card
              v-card-text
                ol
                  li(v-for='t in translationFull') {{t}}

      .radical-container(column)
        .radical.sans-serif(v-for='radical in radicals')
          v-tooltip(top)
            span(slot='activator') {{radical.radical}}
            .text-xs-center {{radical.pinyin2}}
            .text-xs-center {{radical.definitions[0]}}
    
</template>

<script>
import tss from '../../shared/tss'
import { lookUp, filterTranslations } from '../../shared/hanzi'
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
        return filterTranslations(this.hanzi.translations)[0].pinyin2
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
        let translations = filterTranslations(this.hanzi.translations)
        translations = translations.filter(t => t.definitions[0].indexOf('surname') < 0)
        let definition = translations[0].definitions
          .filter(d => d.indexOf('CL:') < 0)
          .slice(0, 2)
          .join('; ')
        return definition
      } catch (error) {
        return ''
      }
    },
    translationFull() {
      try {
        let translations = this.hanzi.translations
        translations = translations.filter(t => t.definitions[0].indexOf('surname') < 0)
        let definition = translations[0].definitions.filter(d => d.indexOf('CL:') < 0)
        return definition
      } catch (error) {
        return ''
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
          this.hanzi = (await lookUp(this.character))[this.character]
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
.no-shadow {
  box-shadow: none;
}
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
    'spacer translation controls';
  justify-items: center;
  align-items: center;
  padding: 10px;
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
  font-size: 18px;
  padding: 3px;
}

.controls {
  grid-area: controls;
  align-self: start;
}
.serif {
  font-family: 'Simsun', Georgia, 'Times New Roman', '仿宋', STXihei, '华文仿宋', serif;
}

.sans-serif {
  font-family: 'Microsoft YaHei', Georgia, 'Times New Roman', 微软雅黑, STXihei, 华文细黑, serif;
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
  width: 100%;
}
</style>
