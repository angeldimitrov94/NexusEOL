import { createRouter, createWebHashHistory, createWebHistory, type RouteLocationNormalized } from 'vue-router'
import ProductViewerVue from '@/views/ProductViewer.vue';
import CreateProductVue from '@/views/CreateProduct.vue';
import ProductsListVue from '@/views/ProductsList.vue';
import ProductEditVue from '@/views/ProductEdit.vue';
import CreateUserVue from '@/views/CreateUser.vue';
import UsersListVue from '@/views/UsersList.vue';
import UserEditVue from '@/views/UserEdit.vue';
import DashboardVue from '@/views/Dashboard.vue';
import TestsListsVue from '@/views/TestsList.vue';
import TestEditVue from '@/views/TestEdit.vue'
import CreateTestVue from '@/views/CreateTest.vue';
import UserViewerVue from '@/views/UserViewer.vue';
import AccountsListVue from '@/views/AccountsList.vue';
import AccountsViewerVue from '@/views/AccountsViewer.vue';
import AccountEditVue from '@/views/AccountEdit.vue';
import CreateAccountVue from '@/views/CreateAccount.vue';
import PublicLandingVue from '@/views/PublicLanding.vue';
import ResetPasswordVue from '@/views/ResetPassword.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/portal', component: PublicLandingVue },
    { path: '/portal/dashboard', component: DashboardVue, meta: { title: 'Dashboard' } },
    { path: '/portal/products/:id', component: ProductViewerVue, props: true, meta: { title: 'Product View' }},
    { path: '/portal/products/manage', component: ProductsListVue, meta: { title: 'Manage Products' }},
    { path: '/portal/products/manage/create', component: CreateProductVue, meta: { title: 'Create Product' } },
    { path: '/portal/products/manage/:id/edit', name: "ProductEdit", component: ProductEditVue, props: true, meta: { title: 'Edit Product' }},
    { path: '/portal/products/manage/:id/tests', name: "TestsViewer", component: TestsListsVue, props: true, meta: { title: 'View Product Tests' }},
    { path: '/portal/products/manage/:id/tests/create', name: "CreateTest", component: CreateTestVue, props: true, meta: { title: 'Create Product Test' }},
    { path: '/portal/products/manage/:productId/tests/:testId/edit', name: "TestEdit", component: TestEditVue, props: true, meta: { title: 'Edit Product Test' }},
    { path: '/portal/users', component: UsersListVue, meta: { title: 'View Users' }},
    { path: '/portal/users/:id', component: UserViewerVue, meta: { title: 'View User' }},
    { path: '/portal/users/manage/:id/edit', name: 'UserEdit' , component: UserEditVue, props: true, meta: { title: 'Edit User' }},
    { path: '/portal/users/manage/create', component: CreateUserVue, meta: { title: 'Create User' }},
    { path: '/portal/accounts', component: AccountsListVue, meta: { title: 'View Accounts' }},
    { path: '/portal/accounts/:id', component: AccountsViewerVue, meta: { title: 'View Account' }},
    { path: '/portal/accounts/manage/:id/edit', name: 'AccountEdit' , component: AccountEditVue, props: true, meta: { title: 'Edit Account' }},
    { path: '/portal/accounts/manage/create', component: CreateAccountVue, meta: { title: 'Create Account' }},
    { path: '/portal/resetpassword', component: ResetPasswordVue, meta: { title: 'Reset Password' }}
  ] 
})

router.beforeEach((to:RouteLocationNormalized, from:RouteLocationNormalized) => {
  document.title = to.meta?.title as string ?? 'Nexus EOL'
})

export default router