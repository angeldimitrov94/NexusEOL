<template>
    <nav :class="[`navbar-${theme}`, `bg-${theme}`, 'navbar', 'navbar-expand-lg']">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">{{ this.currentUser.account.name }}</a>
            <ul class="nav nav-tabs">
                <li><router-link 
                    to="/"
                    class="nav-link"
                    aria-current="page"
                    active-class="active"
                    >Overview</router-link></li>
                <NavbarLink 
                v-for="{name, id} in this.activeProducts"
                class="nav-item" 
                :key="id"
                :name="name" 
                :id="id"
                ></NavbarLink>
                <li v-if="this.currentUser.level === 'superadmin' || this.currentUser.level === 'admin'">
                    <router-link 
                    to="/products"
                    class="nav-link"
                    aria-current="page"
                    active-class="active"
                    >Manage Products</router-link>
                </li>
                <li v-if="this.currentUser.level === 'superadmin'">
                    <router-link 
                    to="/users"
                    class="nav-link"
                    aria-current="page"
                    active-class="active"
                    >Manage Users</router-link>
                </li>
            </ul>
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
    inject: ['$bus', '$users', '$router'],
    data() {
        return {
            theme: "light",
            currentUser: new User()
        };
    },
    created() {
        this.getThemeSetting();
        this.currentUser = this.$users.getCurrentUser();
        this.$bus.$on('user-change', () => { 
            this.currentUser = this.$users.getCurrentUser();
            this.$router.push({ path: '/' });
        });
    },
    methods: {
        changeTheme() {
            let theme = "light";
            if (this.theme == "light") {
                theme = "dark";
            }
            this.theme = theme;
            this.storeThemeSetting();
        },
        storeThemeSetting() {
            localStorage.setItem('theme', this.theme);
        },
        getThemeSetting() {
            let theme = localStorage.getItem('theme');

            if(theme){
                this.theme = theme;
            }
        }
    },
    components: { NavbarLink, UserBadge },
    computed: {
        activeProducts() {
            return this.currentUser.account.products?.filter(p => p.active);
        }
    }
}
</script>