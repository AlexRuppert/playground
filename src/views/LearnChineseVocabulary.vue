<template lang="pug">
 v-slide-y-transition(mode='out-in')
    v-layout(column='' align-center='')
     
      vocabulary-card(chinese='我喜欢鲜花和蛋糕。' english='I like flowers and cake.')
</template>

<script>
import vocabularyCard from '@/components/learn-chinese/vocabulary-card.vue'
export default {
  name: 'LearnChineseVocabulary',
  components: { vocabularyCard },
  store: [],
  data() {
    return {
      
    }
  },
  methods: {},
  mounted() {
    
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
