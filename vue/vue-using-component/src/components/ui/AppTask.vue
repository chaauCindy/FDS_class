<template lang="pug">
  li
    a(href)
      Awesome(:icon="icon" size="small")
      span 
        slot
</template>

<script>
import Awesome from '../icon/Awesome.vue';

export default {
  components: {
    Awesome
  },
  props: ['icon']
}
</script>
