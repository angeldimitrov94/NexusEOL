<template>
    <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
            <!-- <router-link 
                to="/"
                class="nav-brand"
                aria-current="page"
                active-class="active"
                >{{ currentUser?.account?.name }}
            </router-link> -->
            <NavbarLink 
            v-for="{name, __id} in activeProducts"
            :key="__id"
            :name="name" 
            :id="__id"
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
import { defineComponent } from 'vue';
import { EventBus } from '@/utils/eventbus';
import { getAllInjectedUtils } from '@/utils/injector-utils';
import type {  ProductAttrs } from '@testsequencer/common';
import type CookieUser from '@/models/cookie-user';

export default defineComponent({
    data() {
        return {
            activeProducts: [] as ProductAttrs[],
            $users: new UserUtil(),
            $products: new ProductUtil(),
            $bus: new EventBus()
        };
    },
    async created() {
        const { $users, $products, $bus } = getAllInjectedUtils();

        this.$data.$users = $users;
        this.$data.$products = $products;
        this.$data.$bus = $bus;

        if(this.$data.$users.cachedCookieUser !== undefined) {
            const allProducts = await this.$data.$products.getAllProducts();
            this.activeProducts = allProducts?.filter(p => p.active);
        }
        
        this.$data.$bus.$on('user-change', async () => { 
            const allProducts = await this.$data.$products.getAllProducts();
            this.activeProducts = allProducts?.filter(p => p.active);
            this.$router.push({ path: '/' });
        });

        this.$data.$bus.$on('product-created', async () => {
            const allProducts = await this.$data.$products.getAllProducts();
            this.activeProducts = allProducts?.filter(p => p.active);
        })
    },
    methods: {
        userIsAdmin() {
            return this.$data.$users.cachedCookieUser?.level === 'superadmin' || this.$data.$users.cachedCookieUser?.level === 'admin';
        },
        userIsSuperadmin() {
            return this.$data.$users.cachedCookieUser?.level === 'superadmin';
        }
    },
    components: { NavbarLink, UserBadge }
});
</script>