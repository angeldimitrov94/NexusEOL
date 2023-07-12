<template>
    <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
            <router-link 
                to="/"
                class="nav-brand"
                aria-current="page"
                active-class="active"
                >{{ currentUserAccountName }}
            </router-link>
            <NavbarLink 
            v-for="{name, __id} in activeProducts"
            :key="__id"
            :name="name" 
            :id="__id"
            ></NavbarLink>
            <router-link 
            v-if="userIsAdmin()"
            to="/portal/products/manage"
            class="nav-item"
            aria-current="page"
            active-class="active"
            >Manage Products</router-link>
            <router-link
            v-if="userIsSuperadmin()" 
            to="/portal/users"
            class="nav-item"
            aria-current="page"
            active-class="active"
            >Manage Users</router-link>
            <router-link 
            v-if="userIsSuperadmin()"
            to="/portal/accounts"
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
import { AccountUtil } from '@/utils/accountutils';

export default defineComponent({
    data() {
        return {
            activeProducts: [] as ProductAttrs[],
            $users: new UserUtil(),
            $products: new ProductUtil(),
            $bus: new EventBus(),
            $accounts: new AccountUtil(),
            currentUserAccountName: ""
        };
    },
    async created() {
        const { $users, $products, $bus, $accounts } = getAllInjectedUtils();

        this.$data.$users = $users;
        this.$data.$products = $products;
        this.$data.$bus = $bus;
        this.$data.$accounts = $accounts;

        if(this.$data.$users.cachedCookieUser !== undefined) {
            const allProducts = await this.$data.$products.getAllProducts();
            this.activeProducts = allProducts?.filter(p => p.active);
        }
        
        this.$data.$bus.$on('user-change', async () => { 
            const allProducts = await this.$data.$products.getAllProducts();
            this.activeProducts = allProducts?.filter(p => p.active);
            this.$router.push({ path: '/portal' });
        });

        this.$data.$bus.$on('product-created', async () => {
            const allProducts = await this.$data.$products.getAllProducts();
            this.activeProducts = allProducts?.filter(p => p.active);
        })

        const currentUserAccountId = this.$data.$users.cachedCookieUser?.accountId;

        if(currentUserAccountId !== undefined) {
            const currentUserAccount = await this.$data.$accounts.getAccount(currentUserAccountId);
            this.$data.currentUserAccountName = currentUserAccount?.name === undefined ? "N/A" : currentUserAccount?.name;
        }
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