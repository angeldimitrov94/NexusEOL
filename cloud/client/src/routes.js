import {createRouter, createWebHashHistory} from 'vue-router';
import ProductViewer from './views/ProductViewer.vue';
import CreateProduct from './views/CreateProduct.vue';
import ProductsList from './views/ProductsList.vue';
import ProductEdit from './views/ProductEdit.vue';
import CreateUser from './views/CreateUser.vue';
import UsersList from './views/UsersList.vue';
import UserEdit from './views/UserEdit.vue';
import Dashboard from './views/Dashboard.vue';
import TestsViewer from './views/TestsViewer.vue';
import TestEdit from './views/TestEdit.vue'
import CreateTest from './views/CreateTest.vue';
import UserViewer from './views/UserViewer.vue';
import AccountsList from './views/AccountsList.vue';
import AccountsViewer from './views/AccountsViewer.vue';
import AccountEdit from './views/AccountEdit.vue';
import CreateAccount from './views/CreateAccount.vue';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/', component: Dashboard },
        { path: '/products/:id', component: ProductViewer, props: true},
        { path: '/products/manage', component: ProductsList},
        { path: '/products/manage/create', component: CreateProduct },
        { path: '/products/manage/:id/edit', name: "ProductEdit", component: ProductEdit, props: true},
        { path: '/products/manage/:id/tests', name: "TestsViewer", component: TestsViewer, props: true},
        { path: '/products/manage/:id/tests/create', name: "CreateTest", component: CreateTest, props: true},
        { path: '/products/manage/:productId/tests/:testId/edit', name: "TestEdit", component: TestEdit, props: true},
        { path: '/users', component: UsersList},
        { path: '/users/:id', component: UserViewer},
        { path: '/users/manage/:id/edit', name: 'UserEdit' , component: UserEdit, props: true},
        { path: '/users/manage/create', component: CreateUser},
        { path: '/accounts', component: AccountsList},
        { path: '/accounts/:id', component: AccountsViewer},
        { path: '/accounts/manage/:id/edit', name: 'AccountEdit' , component: AccountEdit, props: true},
        { path: '/accounts/manage/create', component: CreateAccount}
    ]
});

export default router;