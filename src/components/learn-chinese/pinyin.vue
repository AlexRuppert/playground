<template lang="pug">
  .pinyin(v-html='pinyinColored')
</template>

<script>
export default {
  name: 'pinyin',
  store: [],
  props: {
    pinyin: String,
  },
  data() {
    return {}
  },
  computed: {
    pinyinColored() {
      return this.pinyin
        .replace(/[āɑ̄ēīōūǖĀĒĪŌŪǕ]/g, '<span class="tone t1">$&</span>')
        .replace(/[áɑ́éíóúǘÁÉÍÓÚǗ]/g, '<span class="tone t2">$&</span>')
        .replace(/[ǎɑ̌ěǐǒǔǚǍĚǏǑǓǙ]/g, '<span class="tone t3">$&</span>')
        .replace(/[àɑ̀èìòùǜÀÈÌÒÙǛ]/g, '<span class="tone t4">$&</span>')
    },
  },
}
</script>
<style lang="scss" scoped>
.pinyin {
  margin-top: 6px;
}
</style>

<style lang="scss">
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
</style>
