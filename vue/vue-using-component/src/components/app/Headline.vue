<template lang="pug">
  div
    h1.title.is-3 {{ headline }}
    h3.title.is-5 {{ subheadline }}
    p
      SimpleComp
      SimpleComp
      SimpleComp
</template>

<script>
import SimpleComp from '../SimpleComponent.vue';

export default {
  name : 'app-headline',
  data(){
    return {
      headline : 'App Headline',
      subheadline : 'App Subheadline'
    }
  },
  components : {
    SimpleComp
  }
}
</script>
