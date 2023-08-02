<template>
    <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
            <router-link 
                to="/portal/dashboard"
                class="nav-brand"
                aria-current="page"
                active-class="active"
                >{{ currentUserAccountName }}
            </router-link>
            <NavbarLink 
            v-if="signedIn"
            v-for="{name, id} in activeProducts"
            :key="id"
            :name="name" 
            :id="id"
            ></NavbarLink>
            <router-link 
            v-if="signedIn && userIsAdmin(currentUser)"
            to="/portal/products/manage"
            class="nav-item"
            aria-current="page"
            active-class="active"
            >Manage Products</router-link>
            <router-link
            v-if="signedIn && userIsSuperadmin(currentUser)" 
            to="/portal/users"
            class="nav-item"
            aria-current="page"
            active-class="active"
            >Manage Users</router-link>
            <router-link 
            v-if="signedIn && userIsSuperadmin(currentUser)"
            to="/portal/accounts"
            class="nav-item"
            aria-current="page"
            active-class="active"
            >Manage Accounts</router-link>
            <form class="d-flex gap-3">
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
            $users: {} as UserUtil,
            $products: {} as ProductUtil,
            $bus: new EventBus(),
            $accounts: {} as AccountUtil,
            currentUserAccountName: "",
            currentUser: {} as CookieUser,
            signedIn: false
        };
    },
    async created() {
        const { $users, $products, $bus, $accounts } = getAllInjectedUtils();

        this.$data.$users = $users;
        this.$data.$products = $products;
        this.$data.$bus = $bus;
        this.$data.$accounts = $accounts;
        this.$data.signedIn = await $users.isUserCurrentlySignedIn();

        if(this.$data.signedIn) {
            this.$data.currentUser = await this.$data.$users.getCurrentUser();
            const allProducts = await this.$data.$products.getAllProducts();
            this.activeProducts = allProducts?.filter(p => p.active);
            const currentUserAccountId = this.$data.currentUser?.accountId;
            const currentUserAccount = await this.$data.$accounts.getAccount(currentUserAccountId);
            this.$data.currentUserAccountName = currentUserAccount?.name === undefined ? "" : currentUserAccount?.name;
        } else {
            this.$data.currentUserAccountName = "";
        }
        
        this.$data.$bus.$on('user-change', async () => { 
            this.$data.signedIn = await $users.isUserCurrentlySignedIn();
            if(this.$data.signedIn) {
                this.$data.currentUser = await this.$data.$users.getCurrentUser();
                const allProducts = await this.$data.$products.getAllProducts();
                this.activeProducts = allProducts?.filter(p => p.active);
                const currentUserAccountId = this.$data.currentUser?.accountId;
                const currentUserAccount = await this.$data.$accounts.getAccount(currentUserAccountId);
                this.$data.currentUserAccountName = currentUserAccount?.name === undefined ? "" : currentUserAccount?.name;
            } else {
                this.$data.currentUserAccountName = "";
            }
        });

        this.$data.$bus.$on('product-created', async () => {
            const allProducts = await this.$data.$products.getAllProducts();
            this.activeProducts = allProducts?.filter(p => p.active);
        })
    },
    methods: {
        userIsAdmin(currentUser: CookieUser) {
            return currentUser?.level === 'superadmin' || currentUser?.level === 'admin';
        },
        userIsSuperadmin(currentUser: CookieUser) {
            return currentUser?.level === 'superadmin';
        }
    },
    components: { NavbarLink, UserBadge }
});
</script>