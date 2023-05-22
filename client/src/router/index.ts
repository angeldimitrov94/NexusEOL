import { createRouter, createWebHashHistory } from 'vue-router'
import ProductViewerVue from '../views/ProductViewer.vue';
import CreateProductVue from '../views/CreateProduct.vue';
import ProductsListVue from '../views/ProductsList.vue';
import ProductEditVue from '../views/ProductEdit.vue';
import CreateUserVue from '../views/CreateUser.vue';
import UsersListVue from '../views/UsersList.vue';
import UserEditVue from '../views/UserEdit.vue';
import DashboardVue from '../views/Dashboard.vue';
import TestsViewerVue from '../views/TestsViewer.vue';
import TestEditVue from '../views/TestEdit.vue'
import CreateTestVue from '../views/CreateTest.vue';
import UserViewerVue from '../views/UserViewer.vue';
import AccountsListVue from '../views/AccountsList.vue';
import AccountsViewerVue from '../views/AccountsViewer.vue';
import AccountEditVue from '../views/AccountEdit.vue';
import CreateAccountVue from '../views/CreateAccount.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: DashboardVue },
        { path: '/products/:id', component: ProductViewerVue, props: true},
        { path: '/products/manage', component: ProductsListVue},
        { path: '/products/manage/create', component: CreateProductVue },
        { path: '/products/manage/:id/edit', name: "ProductEdit", component: ProductEditVue, props: true},
        { path: '/products/manage/:id/tests', name: "TestsViewer", component: TestsViewerVue, props: true},
        { path: '/products/manage/:id/tests/create', name: "CreateTest", component: CreateTestVue, props: true},
        { path: '/products/manage/:productId/tests/:testId/edit', name: "TestEdit", component: TestEditVue, props: true},
        { path: '/users', component: UsersListVue},
        { path: '/users/:id', component: UserViewerVue},
        { path: '/users/manage/:id/edit', name: 'UserEdit' , component: UserEditVue, props: true},
        { path: '/users/manage/create', component: CreateUserVue},
        { path: '/accounts', component: AccountsListVue},
        { path: '/accounts/:id', component: AccountsViewerVue},
        { path: '/accounts/manage/:id/edit', name: 'AccountEdit' , component: AccountEditVue, props: true},
        { path: '/accounts/manage/create', component: CreateAccountVue}
  ]
})

export default router
