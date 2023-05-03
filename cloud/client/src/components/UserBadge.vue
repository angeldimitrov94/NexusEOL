<template>
    <form class="row row-cols-lg-auto g-3 align-items-center" v-if="this.currentUser.signedIn === false">
        <div class="col-12">
            <input 
            type="text" 
            class="form-control"
            v-model="this.signinUsername"
            placeholder="Username or email"/>
        </div>
        <div class="col-12">
            <input 
            type="password"
            class="form-control"
            v-model="this.sigininPassword"
            placeholder="Password"/>
        </div>
    </form>
    <button type="button" class="btn btn-secondary" @click.prevent="attemptSigninout()">
    Sign {{this.currentUser.signedIn === false ? 'in' : `${this.currentUser.name} (${this.currentUser.level}) out`}}
    </button>
</template>

<script>
export default {
    inject: ['$users', '$bus'],
    data() {
        return {
            signinUsername: "",
            sigininPassword: "",
            currentUser: {}
        }
    },
    created() {
        this.currentUser = this.$users.getCurrentUser();
    },
    methods: {
        attemptSigninout() {
            let [success, message] = [false, "Invalid sign in/out operation"];

            if(this.currentUser.signedIn === true){
                [success, message] = this.$users.signout();
            }
            else {
                [success, message] = this.$users.signin(this.signinUsername, this.sigininPassword);
            }

            if(success === true) {
                this.$bus.$emit('user-change', {});
            }

            this.signinUsername = "";
            this.sigininPassword = "";

            this.currentUser = this.$users.getCurrentUser();
            
            alert(message);
        }
    }
}
</script>