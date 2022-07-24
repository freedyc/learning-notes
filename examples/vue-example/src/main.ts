import { createApp } from 'vue';
import  { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import './style.css'
import Home from './components/Home.vue'
import About from './components/Index.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
]

const router = createRouter({
  history: createWebHistory(),
  routes, 
})

const app = createApp(App)

app.use(router);

(window as any).vm = app.mount('#app');
