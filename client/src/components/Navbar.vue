<template>
    <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
            <router-link 
                to="/"
                class="nav-brand"
                aria-current="page"
                active-class="active"
                >{{ currentUser?.account?.name }}
            </router-link>
            <NavbarLink 
            v-for="{name, id} in activeProducts"
            :key="id"
            :name="name" 
            :id="id"
            ></NavbarLink>
            <router-link 
            v-if="userIsAdmin()"
            to="/products/manage"
            class="nav-item"
            aria-current="page"
            active-class="active"
            >Manage Products</router-link>
            <router-link
            v-if="userIsSuperadmin()" 
            to="/users"
            class="nav-item"
            aria-current="page"
            active-class="active"
            >Manage Users</router-link>
            <router-link 
            v-if="userIsSuperadmin()"
            to="/accounts"
            class="nav-item"
            aria-current="page"
            active-class="active"
            >Manage Accounts</router-link>
            <form class="d-flex">
                <UserBadge></UserBadge>
            </form>
        </div>
    </nav>
</template>

<script lang="ts">
import NavbarLink from './NavbarLink.vue';
import UserBadge from './UserBadge.vue';
import { UserUtil } from '@/utils/userutils';
import { ProductUtil } from '@/utils/productutils';
import { User } from '@/models/user';
import type { Product } from '@/models/product';
import { defineComponent } from 'vue';
import { EventBus } from '@/utils/eventbus';
import { getAllInjectedUtils } from '@/utils/injector-utils';

export default defineComponent({
    data() {
        return {
            currentUser: new User(),
            activeProducts: [] as Product[],
            $users: new UserUtil(),
            $products: new ProductUtil(),
            $bus: new EventBus()
        };
    },
    created() {
        const { $users, $products, $bus } = getAllInjectedUtils();

        this.$data.$users = $users;
        this.$data.$products = $products;
        this.$data.$bus = $bus;

        this.currentUser = this.$data.$users.getCurrentUser();

        this.activeProducts = this.$data.$products.getCurrentUserAllProducts()?.filter(p => p.active);
        this.$data.$bus.$on('user-change', () => { 
            this.currentUser = this.$data.$users.getCurrentUser();
            this.activeProducts = this.$data.$products.getCurrentUserAllProducts()?.filter(p => p.active);
            this.$router.push({ path: '/' });
        });
        this.$data.$bus.$on('product-created', () => {
            this.activeProducts = this.$data.$products.getCurrentUserAllProducts()?.filter(p => p.active);
        })
    },
    methods: {
        userIsAdmin() {
            return this.currentUser?.level === 'superadmin' || this.currentUser?.level === 'admin';
        },
        userIsSuperadmin() {
            return this.currentUser?.level === 'superadmin';
        }
    },
    components: { NavbarLink, UserBadge }
});
</script>