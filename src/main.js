import Vue from 'vue'
import App from './App.vue'
import VueHtml2Canvas from 'vue-html2canvas';
Vue.use(VueHtml2Canvas);
Vue.config.productionTip = false
 // You need a specific loader for CSS files
import 'vue-datetime/dist/vue-datetime.css'
import { Datetime } from 'vue-datetime';
 
Vue.component('datetime', Datetime);
Vue.use(Datetime)
new Vue({
  render: h => h(App),
}).$mount('#app')
