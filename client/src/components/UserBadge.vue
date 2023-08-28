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
    <button type="button" class="btn btn-secondary" @click="attemptSigninout()">
    Sign {{signInOutTitle}}
    </button>
</template>

<script lang="ts">
import type CookieUser from '@/models/cookie-user';
import type { EventBus } from '@/utils/eventbus';
import { getAllInjectedUtils } from '@/utils/injector-utils';
import type { UserUtil } from '@/utils/userutils';
import type { UserAttrs } from '@testsequencer/common';

export default {
    data() {
        return {
            isSignedIn: false,
            signinUsername: "",
            signinPassword: "",
            $users: {} as UserUtil,
            $bus: {} as EventBus,
            signInOutTitle: "in",
            errorMessage: ""
        }
    },
    async created() {
        const { $users, $bus } = getAllInjectedUtils();

        this.$data.$users = $users;
        this.$data.$bus = $bus

        this.$data.$bus.$on('user-change', this.userChangeRefresh);
        this.$data.isSignedIn = await this.$data.$users.isUserCurrentlySignedIn();
        if(this.$data.isSignedIn) {
            const currentUser = await this.$data.$users.getCurrentUser();
            this.$data.signInOutTitle = this.getSignInOutTitle(currentUser);
        }
    },
    methods: {
        async attemptSigninout() {
            let success = false;

            if(!this.$data.isSignedIn) {
                const result = await this.$data.$users.signin(this.$data.signinUsername, this.$data.signinPassword);    
                const userAttrResult = result as UserAttrs;    
                
                if(userAttrResult.accountId !== undefined && userAttrResult.level && userAttrResult.email) {
                    success = true;
                }
                else {
                    this.$data.errorMessage = `Failed to sign in user : ` + JSON.stringify(result);
                }
            }
            else if(this.$data.isSignedIn === true){
                success = await this.$data.$users.signout();
            }
            else {
                console.error('Neither logged in nor logged out user!');
                this.$data.errorMessage = `Neither logged in nor logged out user!`;
            }

            if(success === true) {
                this.$data.$bus.$emit('user-change', {});
            }
            
            if(this.$data.errorMessage !== "") {
                alert(this.$data.errorMessage);
            }
        },
        async userChangeRefresh() {
            this.$data.isSignedIn = await this.$data.$users.isUserCurrentlySignedIn();
            this.$data.signinUsername = "";
            this.$data.signinPassword = "";
            if(this.$data.isSignedIn) {
                const currentUser = await this.$data.$users.getCurrentUser();
                this.$data.signInOutTitle = this.getSignInOutTitle(currentUser);
            }
            else {
                this.$data.signInOutTitle = this.getSignInOutTitle(undefined);
            }
        },
        getSignInOutTitle(currentUser: CookieUser | undefined) {
            if(currentUser !== undefined) return `${currentUser?.email} (${currentUser?.level}) out`;
            else return 'in';
        }
    }
}
</script>