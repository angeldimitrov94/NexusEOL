import { createApp } from 'vue';
import AppVue from './App.vue';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import { EventBus } from './utils/eventbus';
import { UserUtil } from './utils/userutils';
import { ProductUtil } from './utils/productutils';
import { AccountUtil } from './utils/accountutils';
import router from './router'

const $userUtil = new UserUtil();
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

declare module 'vue' {
    interface ComponentCustomProperties {
        $users: UserUtil,
        $bus: EventBus,
        $products: ProductUtil,
        $accounts: AccountUtil
    }
}