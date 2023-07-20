import { createRouter, createWebHashHistory } from 'vue-router'
import ProductViewerVue from '../views/ProductViewer.vue';
import CreateProductVue from '../views/CreateProduct.vue';
import ProductsListVue from '../views/ProductsList.vue';
import ProductEditVue from '../views/ProductEdit.vue';
import CreateUserVue from '../views/CreateUser.vue';
import UsersListVue from '../views/UsersList.vue';
import UserEditVue from '../views/UserEdit.vue';
import DashboardVue from '../views/Dashboard.vue';
import TestsListsVue from '../views/TestsList.vue';
import TestEditVue from '../views/TestEdit.vue'
import CreateTestVue from '../views/CreateTest.vue';
import UserViewerVue from '../views/UserViewer.vue';
import AccountsListVue from '../views/AccountsList.vue';
import AccountsViewerVue from '../views/AccountsViewer.vue';
import AccountEditVue from '../views/AccountEdit.vue';
import CreateAccountVue from '../views/CreateAccount.vue';
import PublicLandingVue from '../views/PublicLanding.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/portal', component: PublicLandingVue },
    { path: '/portal/dashboard', component: DashboardVue },
    { path: '/portal/products/:id', component: ProductViewerVue, props: true},
    { path: '/portal/products/manage', component: ProductsListVue},
    { path: '/portal/products/manage/create', component: CreateProductVue },
    { path: '/portal/products/manage/:id/edit', name: "ProductEdit", component: ProductEditVue, props: true},
    { path: '/portal/products/manage/:id/tests', name: "TestsViewer", component: TestsListsVue, props: true},
    { path: '/portal/products/manage/:id/tests/create', name: "CreateTest", component: CreateTestVue, props: true},
    { path: '/portal/products/manage/:productId/tests/:testId/edit', name: "TestEdit", component: TestEditVue, props: true},
    { path: '/portal/users', component: UsersListVue},
    { path: '/portal/users/:id', component: UserViewerVue},
    { path: '/portal/users/manage/:id/edit', name: 'UserEdit' , component: UserEditVue, props: true},
    { path: '/portal/users/manage/create', component: CreateUserVue},
    { path: '/portal/accounts', component: AccountsListVue},
    { path: '/portal/accounts/:id', component: AccountsViewerVue},
    { path: '/portal/accounts/manage/:id/edit', name: 'AccountEdit' , component: AccountEditVue, props: true},
    { path: '/portal/accounts/manage/create', component: CreateAccountVue}
  ]
})

export default router
