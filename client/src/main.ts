import { createApp } from 'vue';
import AppVue from './App.vue';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import { EventBus } from './utils/eventbus';
import { UserUtil } from './utils/userutils';
import { ProductUtil } from './utils/productutils';
import { AccountUtil } from './utils/accountutils';
import router from './router'
import axios from 'axios';

function sleep(milliseconds: number) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

const $userUtil = new UserUtil();

$userUtil.initialize();
console.log($userUtil.initialized);

const $eventBus = new EventBus();
const $productUtil = new ProductUtil();
$productUtil.userUtil = $userUtil;
const $accountUtil = new AccountUtil();

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