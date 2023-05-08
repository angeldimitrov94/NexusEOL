<template>
    <form class="row row-cols-lg-auto g-3 align-items-center" v-if="this.isSignedIn === false">
        <div class="col-12">
            <input 
            type="text" 
            class="form-control"
            v-model="this.signinUsername"
            placeholder="Username or email"
            autocomplete="username"/>
        </div>
        <div class="col-12">
            <input 
            type="password"
            class="form-control"
            v-model="this.signinPassword"
            placeholder="Password"
            autocomplete="password"/>
        </div>
    </form>
    <button type="button" class="btn btn-secondary" @click.prevent="attemptSigninout()">
    Sign {{this.getSignInOutTitle()}}
    </button>
</template>

<script>
export default {
    inject: ['$users', '$bus'],
    data() {
        return {
            currentUser: null,
            isSignedIn: false,
            signinUsername: "",
            signinPassword: ""
        }
    },
    created() {
        this.currentUser = this.$users.getCurrentUser();
        this.isSignedIn = this.$users.isUserCurrentlySignedIn();
        this.$bus.$on('user-change', this.userChangeRefresh);
    },
    methods: {
        async attemptSigninout() {
            let [success, message] = [false, "Invalid sign in/out operation"];

            if(this.$users.getCurrentUser() === null) {
                console.log("attempt signin");
                [success, message] = await this.$users.signin(this.signinUsername, this.signinPassword);
            }
            else if(this.$users.isUserCurrentlySignedIn() === true){
                console.log("attempt signout");
                [success, message] = this.$users.signout();
            }
            else {
                console.error('Neither logged in nor logged out user!');
            }

            this.isSignedIn = this.$users.isUserCurrentlySignedIn();

            if(success === true) {
                this.$bus.$emit('user-change', {});
            }

            this.signinUsername = "";
            this.signinPassword = "";
            
            alert(message);
        },
        userChangeRefresh() {
            this.currentUser = this.$users.getCurrentUser();
            this.isSignedIn = this.$users.isUserCurrentlySignedIn();
        },
        getSignInOutTitle() {
            const thisUser = this.$users.getCurrentUser();
            return this.$users.isUserCurrentlySignedIn() ? `${thisUser?.name} (${thisUser?.level}) out` : 'in';
        }
    }
}
</script>