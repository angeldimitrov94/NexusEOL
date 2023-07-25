import { createApp } from 'vue';
import AppVue from './App.vue';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import { EventBus } from './utils/eventbus';
import { UserUtil } from './utils/userutils';
import { ProductUtil } from './utils/productutils';
import { AccountUtil } from './utils/accountutils';
import router from './router'
import axios from 'axios';

let devFlag: boolean = false;
console.log(import.meta.env);
if(import.meta.env.VITE_DEV) {
    devFlag = import.meta.env.VITE_DEV === undefined ? false : import.meta.env.VITE_DEV === "1" ? true : false;
    console.log(`devFlag : ${devFlag}`);
}

const $userUtil = new UserUtil(devFlag);

$userUtil.initialize();
console.log($userUtil.initialized);

const $eventBus = new EventBus();
const $productUtil = new ProductUtil(devFlag);
$productUtil.userUtil = $userUtil;
const $accountUtil = new AccountUtil(devFlag);

const app = createApp(AppVue)
    .use(router);
app.provide('$users', $userUtil);
app.provide('$bus', $eventBus);
app.provide('$products', $productUtil);
app.provide('$accounts', $accountUtil);

app.mount('#app')

axios.defaults.withCredentials = true;

declare module 'vue' {
    interface ComponentCustomProperties {
        $users: UserUtil,
        $bus: EventBus,
        $products: ProductUtil,
        $accounts: AccountUtil
    }
}