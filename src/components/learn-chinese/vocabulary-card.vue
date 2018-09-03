<template lang="pug">
  v-card.full-width
    v-card-title.vocabulary-card
      .chinese.sans-serif
        v-menu(v-for='character in chineseArray' offset-y :close-on-content-click='false')
          .characterBlock(slot='activator')
            pinyin.pinyin(:pinyin='getPinyin(character)' size='12')
            span {{character}}
          character-card(:character='character')
      .controls
        v-btn(flat icon color='primary' v-long-press='setPlaySlow' @mousedown='playSlow=false' @mouseup='playSound')
            v-icon volume_up
      v-divider.spacer
      .english {{english}}
    
</template>

<script>
import tss from '../../shared/tss'
import { lookUp, filterTranslations } from '../../shared/hanzi'
import pinyin from '@/components/learn-chinese/pinyin.vue'
import characterCard from '@/components/learn-chinese/character-card.vue'
import uniq from 'lodash.uniq'
export default {
  name: 'vocabulary-card',
  store: [],
  props: {
    chinese: String,
    english: String,
  },
  components: {
    pinyin,
    characterCard,
  },
  data() {
    return {
      playSlow: false,
      hanzi: {},
    }
  },
  computed: {
    chineseArray() {
      return Array.from(this.chinese)
    },
  },
  watch: {
    chinese: function(newVal, oldVal) {
      this.lookUpCharacters()
    },
  },
  methods: {
    lookUpCharacters() {
      if (this.chinese) {
        ;(async () => {
          const uniqueCharacters = uniq(this.chineseArray)
          this.hanzi = await lookUp(uniqueCharacters)
        })()
      }
    },
    async playSound() {
      if (this.playSlow) {
        tss.chineseSlow(this.chinese)
      } else {
        tss.chinese(this.chinese)
      }
    },
    async setPlaySlow() {
      this.playSlow = true
    },
    getPinyin(character) {
      try {
        return filterTranslations(this.hanzi[character].translations)[0].pinyin2
      } catch (err) {
        return ''
      }
    },
  },
  beforeMount() {
    this.lookUpCharacters()
  },
}
</script>


<style scoped lang="scss">
@import '@/shared/common.scss';
.no-shadow {
  box-shadow: none;
}
.full-width {
  width: 100%;
}

.vocabulary-card {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 35px;
  grid-template-rows: 1fr 15px 1fr;
  grid-template-areas:
    'chinese controls'
    'spacer spacer'
    'english controls2';
  justify-items: center;
  align-items: center;
  padding: 10px;
}

.spacer {
  grid-area: spacer;
}
.controls {
  grid-area: controls;
}

.chinese {
  grid-area: chinese;
  padding: 10px;
  flex-direction: row;
  display: flex;
  flex-wrap: wrap;
}

.characterBlock {
  font-size: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding: 3px 3px;
}
.pinyin {
  opacity: 0.3;
}

.english {
  grid-area: english;
}
</style>
