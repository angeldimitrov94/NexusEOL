import {createRouter, createWebHashHistory} from 'vue-router';
import ProductViewer from './views/ProductViewer.vue';
import CreateProduct from './views/CreateProduct.vue'
import ProductsList from './views/ProductsList.vue'
import ProductEdit from './views/ProductEdit.vue'
import CreateUser from './views/CreateUser.vue'
import UsersList from './views/UsersList.vue'
import UserEdit from './views/UserEdit.vue'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/:id?', component: ProductViewer, props: true },
        { 
            path: '/products', 
            component: ProductsList, 
            children: [
            { path: 'create', component: CreateProduct },
            { path: '', component: ProductsList },
            { path: ':id/edit', component: ProductEdit, props: true }
        ]},
        { 
            path: '/users', 
            component: UsersList, 
            children: [
            { path: 'create', component: CreateUser },
            { path: '', component: UsersList },
            { path: ':userName/edit', component: UserEdit, props: true }
        ]},
    ]
});

export default router;