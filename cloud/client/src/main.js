import { createApp } from 'vue'
import App from './App.vue'
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import { EventBus } from './utils/Events';
import router from './routes';
import { UserUtil } from './userutils';

const app = createApp(App);
app.use(router);
const $userUtil = new UserUtil();
const $eventBus = new EventBus();
app.provide('$bus', $eventBus);
app.provide('$users', $userUtil);
app.mount('#app')