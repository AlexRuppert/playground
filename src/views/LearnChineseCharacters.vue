<template lang="pug">
  v-container(fluid='')
    v-slide-y-transition(mode='out-in')
      v-layout(column='' align-center='')
        v-text-field(prepend-icon='search' v-model='currentCharacterComputed' counter='1' clearable)
        character-card(:character='currentCharacterComputed')
</template>

<script>
import characterCard from '@/components/learn-chinese/character-card.vue'
export default {
  name: 'LearnChineseCharacters',
  components: { characterCard },
  store: ['hanzi'],
  props: ['character'],
  data() {
    return {
      currentCharacter: this.character,
    }
  },
  computed: {
    currentCharacterComputed: {
      get() {
        return this.currentCharacter
      },
      set(value) {
        if (value.length > 0) {
          this.currentCharacter = value[0]
        } else {
          this.currentCharacter = ''
        }
      },
    },
  },
  methods: {},
  mounted() {},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
