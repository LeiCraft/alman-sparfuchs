import "./assets/style.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import { createApp } from 'vue';
// @ts-ignore
import App from './App.vue';

//import router from './router'

const app = createApp(App);

//app.use(router)
app.mount('#app');
