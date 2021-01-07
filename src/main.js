import Vue from 'vue'
import App from './App.vue'
//Importando bootstrap vue con los componentes a utilizar, previamente instalada con el comando npm install 
import { BootstrapVue, IconsPlugin, CardPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

new Vue({
  el: '#app',
  render: h => h(App)
  
})

//Para habilitar componentes a utilizar en Vue
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(CardPlugin)