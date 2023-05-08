import { createApp } from 'vue'
import App from './App.vue'
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import { EventBus } from './utils/eventbus';
import router from './routes';
import { UserUtil } from './utils/userutils';
import { ProductUtil } from './utils/productutils';
import { AccountUtil } from './utils/accountutils';

const app = createApp(App);
app.use(router);
const $userUtil = new UserUtil();
const $eventBus = new EventBus();
const $productUtil = new ProductUtil($userUtil);
const $accountUtil = new AccountUtil();
app.provide('$bus', $eventBus);
app.provide('$users', $userUtil);
app.provide('$products', $productUtil);
app.provide('$accounts', $accountUtil);
app.mount('#app')