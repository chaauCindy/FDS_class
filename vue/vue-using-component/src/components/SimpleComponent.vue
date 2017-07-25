<template lang="pug">
  button.button(type="button" @click="updateCount")  {{ count }}
</template>

<script>
const _data = {
  count : 0
};
export default {
  data(){
     return { count : 0 };
  },
  methods : {
    updateCount(){
      this.count++;
    }
  }
}
</script>
