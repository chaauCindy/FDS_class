<template lang="pug">
  ul.menu-list
    app-task(v-for="task in app.tasks" :icon="task.icon") {{ task.text }}
</template>


<script>
import AppTask from './AppTask.vue';

export default {
  components : { AppTask },
  data () {
    return {
      app : {
        tasks : [
          { text: 'Good!!', icon: 'thumbs-o-up'},
          { text: 'Bad~~', icon: 'thumbs-o-down'},
          { text: '페이스북', icon: 'facebook'},
          { text: '구글플러스', icon: 'google-plus'},
          { text: '텀블러 +', icon: 'tumblr'},
        ]
      }
    }
  }
}
</script>
