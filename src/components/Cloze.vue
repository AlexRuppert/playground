<template lang='pug'>
  div
    v-form.blocks.line-height(ref='form')
      span.block(v-for='(block, i) in textBlocks' :key='i')
        span {{block.text}}
        v-select.inline-select(v-if='!block.last'
              v-model='block.value'
              :key='i'
              :items='options(i)'
              label=''
              @input='selectionChanged'
              
              :style='{width: width + "px"}')
    v-btn.primary(flat @click='removeWrong') Remove Wrong
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
@Component
export default class Cloze extends Vue {
  @Prop(String) readonly text!: string
  @Prop(Boolean) readonly ignoreCase!: boolean
  maxOptions = []
  currentOptions = []
  values = []
  width = 150
  oldText = ''

  @Watch('text') onTextChanged(val: string, oldVal: string) {
    this.currentOptions = []
  }
  options(i) {
    if (this.currentOptions.length === 0) {
      this.currentOptions = this.maxOptions
      this.width = this.calcWidth(this.currentOptions)
    }
    if (this.values[i] && this.values[i].length > 0) {
      return [this.values[i], ...this.currentOptions]
    }
    return this.currentOptions.slice().sort()
  }
  get textBlocks() {
    const re = /\[\[([^\]]*)\]\]/g
    let m
    let regexResults = []
    while ((m = re.exec(this.text))) {
      regexResults.push(m)
    }
    let offset = 0
    let blocks = []

    let options = regexResults.map(r => {
      let result = r[1]
      if (this.ignoreCase) {
        result = result.toLowerCase()
      }
      return result
    })
    this.maxOptions = options

    regexResults.forEach(r => {
      let text = this.text.substr(offset, r.index - offset)
      offset = r.index + r[0].length
      blocks.push({ text, last: false, value: '' })
    })
    blocks.push({
      text: this.text.substr(offset),
      last: true,
      value: '',
    })
    return blocks
  }

  calcWidth(options: string[]) {
    if (options.length === 0) {
      return 10
    }
    const longest = Math.max(...options.map(el => el.length))
    return 10 + longest * 10
  }
  updateValues() {
    this.values = this.textBlocks
      .map(t => t.value)
      .filter((_, i) => i !== this.textBlocks.length - 1)
  }
  selectionChanged() {
    this.updateValues()
    const maxOptionsCopy = [...this.maxOptions]
    this.values.forEach(v => {
      const index = maxOptionsCopy.indexOf(v)
      if (index !== -1) maxOptionsCopy.splice(index, 1)
    })
    const counts = maxOptionsCopy.reduce((acc, val) => {
      acc[val] = (acc[val] || 0) + 1
      return acc
    }, {})
    this.currentOptions = maxOptionsCopy

    if (JSON.stringify(this.maxOptions) === JSON.stringify(this.values)) {
      this.$emit('correct', this.values)
    }
  }
  removeWrong() {
    this.updateValues()
    if (this.values.length !== this.maxOptions.length) return
    const correctness = this.maxOptions.forEach((o, i) => {
      if (o !== this.values[i]) {
        this.textBlocks[i].value = ''
      }
    })
  }
  mounted() {
    //@ts-ignore
    this.$refs.form.validate()
  }
}
</script>

<style lang="stylus">
.inline-select {
  display: inline-flex;
  margin-top: 0;
  margin-left: 5px;
  margin-right: 5px;
  padding: 0;
  max-wodth: 200px;

  .v-input__slot {
    margin-bottom: 0;
  }

  .v-input__slot:before {
    border-color: rgba(255, 0, 0, 1);
  }

  .v-text-field__details {
    display: none;
  }
}

.line-height {
  line-height: 40px;
  text-align: justify;
  font-size: 16px;
}
</style>
