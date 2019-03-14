import Vue from 'vue/dist/vue.js'
import Hello from './components/Hello.vue'

new Vue({
    el: '#app',
    components: { Hello },
    template: '<Hello/>'
})