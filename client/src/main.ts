import { createApp } from 'vue';
import AppVue from './App.vue';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import { EventBus } from './utils/eventbus';
import { UserUtil } from './utils/userutils';
import { ProductUtil } from './utils/productutils';
import { AccountUtil } from './utils/accountutils';
import router from './router'
import { AccountUtilSymbol, EventBusSymbol, ProductUtilSymbol, UsersUtilSymbol } from './models/symbols';

const $userUtil = new UserUtil();
const $eventBus = new EventBus();
const $productUtil = new ProductUtil();
$productUtil.userUtil = $userUtil;
const $accountUtil = new AccountUtil();

const app = createApp(AppVue)
    .use(router);
app.provide(UsersUtilSymbol, $userUtil);
app.provide(EventBusSymbol, $eventBus);
app.provide(ProductUtilSymbol, $productUtil);
app.provide(AccountUtilSymbol, $accountUtil);

app.mount('#app')

declare module 'vue' {
    interface ComponentCustomProperties {
        $users: UserUtil,
        $bus: EventBus,
        $products: ProductUtil,
        $accounts: AccountUtil
    }
}