import Vue from 'vue';
import App from './App.vue';
// import AppHeadline from './components/app/Headline.vue';

const appHeadline = {
  template: `
    <div class="component-root">
      <h3>{{ headline }}</h3>
    </div>
  `,
  data() {
    return {
      headline : 'App Headline'
    }
  },
};
// Vue.component('app-headline',appHeadline);

new Vue({
  el: '#app',
  render: h => h(App),
});
