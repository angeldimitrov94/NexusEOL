<template>
    <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
            <router-link 
                to="/"
                class="nav-brand"
                aria-current="page"
                active-class="active"
                >{{ this.currentUser?.account?.name }}
            </router-link>
            <NavbarLink 
            v-for="{name, id} in this.activeProducts"
            :key="id"
            :name="name" 
            :id="id"
            ></NavbarLink>
            <router-link 
            v-if="this.userIsAdmin()"
            to="/products/manage"
            class="nav-item"
            aria-current="page"
            active-class="active"
            >Manage Products</router-link>
            <router-link
            v-if="this.userIsSuperadmin()" 
            to="/users"
            class="nav-item"
            aria-current="page"
            active-class="active"
            >Manage Users</router-link>
            <router-link 
            v-if="this.userIsSuperadmin()"
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

<script>
import NavbarLink from './NavbarLink.vue';
import UserBadge from './UserBadge.vue';
import { User } from '../models/user.js'

export default {
    inject: ['$bus', '$users', '$products'],
    data() {
        return {
            currentUser: null,
            activeProducts: []
        };
    },
    created() {
        this.currentUser = this.$users.getCurrentUser();
        this.activeProducts = this.$products.getCurrentUserAllProducts()?.filter(p => p.active);
        this.$bus.$on('user-change', () => { 
            this.currentUser = this.$users.getCurrentUser();
            this.activeProducts = this.$products.getCurrentUserAllProducts()?.filter(p => p.active);
            this.$router.push({ path: '/' });
        });
        this.$bus.$on('product-created', () => {
            this.activeProducts = this.$products.getCurrentUserAllProducts()?.filter(p => p.active);
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
}
</script>