<template lang='pug'>
  v-form.blocks.line-height(ref='form')
    span.block(v-for='(block, i) in textBlocks' :key='i')
      span {{block.text}}
      v-select.inline-select(v-if='!block.last'
           v-model='block.value'
           :key='i'
          :items='options(i)'
          label=''
          @input='selectionChanged'
         :rules="[(value => !!value || 'Required.')]"
          :style='{width: width + "px"}')

</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component
export default class Cloze extends Vue {
  @Prop(String) readonly text!: string
  @Prop(Boolean) readonly ignoreCase!: boolean
  maxOptions = []
  currentOptions = []
  values = []
  width = 150
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
  selectionChanged() {
    this.values = this.textBlocks
      .map(t => t.value)
      .filter((_, i) => i !== this.textBlocks.length - 1)
    const nonEmptyValues = this.values.filter(v => v.length > 0)
    let maxOptionsCopy = [...this.maxOptions]
    this.values.forEach(v => {
      const index = maxOptionsCopy.indexOf(v)
      if (index !== -1) maxOptionsCopy.splice(index, 1)
    })

    this.currentOptions = maxOptionsCopy

    if (JSON.stringify(this.maxOptions) === JSON.stringify(this.values)) {
      this.$emit('correct', this.values)
    }
  }
  mounted() {
    //@ts-ignore
    this.$refs.form.validate()
  }
}
</script>

<style lang="stylus">
.inline-select {
  display: inline-block;
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
