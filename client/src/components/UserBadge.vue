<template>
    <form class="row row-cols-lg-auto g-3 align-items-center" v-if="isSignedIn === false">
        <div class="col-12">
            <input 
            type="text" 
            class="form-control"
            v-model="signinUsername"
            placeholder="Username or email"
            autocomplete="username"/>
        </div>
        <div class="col-12">
            <input 
            type="password"
            class="form-control"
            v-model="signinPassword"
            placeholder="Password"
            autocomplete="password"/>
        </div>
    </form>
    <button type="button" class="btn btn-secondary" @click.prevent="attemptSigninout()">
    Sign {{getSignInOutTitle()}}
    </button>
</template>

<script lang="ts">
import { User } from '@/models/user';
import type { EventBus } from '@/utils/eventbus';
import { getAllInjectedUtils } from '@/utils/injector-utils';
import type { UserUtil } from '@/utils/userutils';

export default {
    data() {
        return {
            currentUser: new User(),
            isSignedIn: false,
            signinUsername: "",
            signinPassword: "",
            $users: {} as UserUtil,
            $bus: {} as EventBus
        }
    },
    created() {
        const { $users, $bus } = getAllInjectedUtils();

        this.$data.$users = $users;
        this.$data.$bus = $bus

        this.currentUser = this.$data.$users.getCurrentUser();
        this.isSignedIn = this.$data.$users.isUserCurrentlySignedIn();
        this.$data.$bus.$on('user-change', this.userChangeRefresh);
    },
    methods: {
        async attemptSigninout() {
            let success = false;
            let message = "Invalid sign in/out operation";

            if(this.$data.$users.getCurrentUser().isDefault() === true) {
                console.log("attempt signin");
                [success, message] = await this.$data.$users.signin(this.$data.signinUsername, this.$data.signinPassword);
            }
            else if(this.$data.$users.isUserCurrentlySignedIn() === true){
                console.log("attempt signout");
                [success, message] = this.$data.$users.signout();
            }
            else {
                console.error('Neither logged in nor logged out user!');
            }

            this.$data.isSignedIn = this.$data.$users.isUserCurrentlySignedIn();

            if(success === true) {
                this.$data.$bus.$emit('user-change', {});
            }

            this.$data.signinUsername = "";
            this.$data.signinPassword = "";
            
            alert(message);
        },
        userChangeRefresh() {
            this.$data.currentUser = this.$data.$users.getCurrentUser();
            this.$data.isSignedIn = this.$data.$users.isUserCurrentlySignedIn();
        },
        getSignInOutTitle() {
            const thisUser = this.$data.$users.getCurrentUser();
            return this.$data.$users.isUserCurrentlySignedIn() ? `${thisUser?.name} (${thisUser?.level}) out` : 'in';
        }
    }
}
</script>