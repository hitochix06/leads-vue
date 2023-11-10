import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.css'

import { createApp } from 'vue'

import { createRouter, createWebHistory } from "vue-router";
import App from './App.vue'
import List from "./components/List.vue";
import Form from "./components/form.vue";


const routes = [
  { path: '/', component: List },
  { path: '/form', component: Form },
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // Abréviation de `routes : routes`
})

// 5. Créez et montez l’instance root.
const app = createApp(App) // L’application ne devrait pas être dans les accolades bouclées

app.use(router)

app.mount('#app')