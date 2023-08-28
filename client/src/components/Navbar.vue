<template>
    <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
            <router-link 
                to="/portal"
                class="btn btn-secondary"
                aria-current="page"
                active-class="active"
                >Home</router-link>
            <router-link 
                v-if="signedIn"
                to="/portal/dashboard"
                class="btn btn-secondary"
                aria-current="page"
                active-class="active"
                >Dashboard</router-link>
            <div class="dropdown" v-if="signedIn">
                <button class="btn btn-secondary dropdown-toggle" 
                type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" 
                aria-expanded="false" :disabled="productsCount === 0">
                    Products ({{ productsCount }})
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <NavbarLink 
                        v-for="{name, id} in activeProducts"
                        :key="id"
                        :name="name" 
                        :id="id"
                        :dropdownitem="true"
                    ></NavbarLink>
                    <li v-if="userIsAdmin(currentUser)"><hr class="dropdown-divider"></li>
                    <li v-if="userIsAdmin(currentUser)">
                        <router-link 
                            to="/portal/products/manage"
                            aria-current="page"
                            active-class="active"
                            class="dropdown-item"
                            >Manage Products</router-link>
                    </li>
                </ul>
            </div>
            <router-link
            v-if="signedIn && userIsAdmin(currentUser)" 
            to="/portal/users"
            class="btn btn-secondary"
            aria-current="page"
            active-class="active"
            >Manage Users</router-link>
            <router-link 
            v-if="signedIn && userIsSuperadmin(currentUser)"
            to="/portal/accounts"
            class="btn btn-secondary"
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
import {  UserRole, type ProductAttrs } from '@testsequencer/common';
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
            signedIn: false,
            productsCount: 0
        };
    },
    async created() {
        const { $users, $products, $bus, $accounts } = getAllInjectedUtils();

        this.$data.$users = $users;
        this.$data.$products = $products;
        this.$data.$bus = $bus;
        this.$data.$accounts = $accounts;
        await this.userRefresh();
        await this.productRefresh();

        this.$data.$bus.$on('user-change', this.userRefresh);
        this.$data.$bus.$on('product-created', this.productRefresh)
    },
    methods: {
        userIsAdmin(currentUser: CookieUser) {
            return currentUser?.level === UserRole.SUPERADMIN || currentUser?.level === UserRole.ADMIN;
        },
        userIsSuperadmin(currentUser: CookieUser) {
            return currentUser?.level === UserRole.SUPERADMIN;
        },
        async userRefresh() {
            this.$data.signedIn = await this.$data.$users.isUserCurrentlySignedIn();

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
        },
        async productRefresh() {
            const allProducts = await this.$data.$products.getAllProducts();
            this.activeProducts = allProducts?.filter(p => p.active);
            this.productsCount = this.activeProducts.length;
        }
    },
    components: { NavbarLink, UserBadge }
});
</script>