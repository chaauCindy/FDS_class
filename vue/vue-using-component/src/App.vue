<template lang="pug">
  #app.container(v-cloak)
    .columns
      .column.is-6.is-offset-3
        //- h1.title.is-3(v-text="subject")
        .field
          .control
            .select
              select(v-model="choice_component")
                option(v-for="comp in components" :disabled="!comp.value" :value="comp.value") {{ comp.text }}
        hr
        .box
          div(v-if="!choice_component") 다이내믹 컴포넌트 로케이션
          div(v-else :is="choice_component")
        hr
        //- div(:is="choice_component")
        .box
          awesome(icon="github" size="large") 
            strong Github
          awesome(icon="facebook" size="small") 
          awesome(icon="google-plus" size="medium") 
          awesome(:icon="checked_icon" size="large") 
        hr
        .menu
          app-tasks
</template>

<script>
import Vue from 'vue';
import AppHeadline from './components/app/Headline.vue';
import IconGithub from './components/icon/Github.vue';
import Awesome from './components/icon/Awesome.vue';
import AppTasks from './components/ui/AppTasks.vue';

export default {
  name: 'app',
  components : {
    AppTasks,
    AppHeadline,
    IconGithub,
    Awesome
  },
  mounted(){
    // console.log(!!Vue.component('app-headline'));
    window.setTimeout(()=>this.checked_icon='check-circle-o', 4000);
  },
  data () {
    return {
      subject : 'Vue 컴포넌트 학습',
      checked_icon : 'circle-o',
      choice_component : '',
      components : [
        { text: '컴포넌트 선택', value:'' },
        { text: 'Headline', value:'app-headline' },
        { text: 'Github', value:'icon-github' },
      ],
    }
  },
  methods: {
  }
}
</script>

<style lang="sass">
html
  font-size: 100%
  background: #fff
body
  margin: 0
[v-cloak]
  display: none
#app
  margin-top: 40px
</style>
