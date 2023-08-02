<template>
    <form>
        <h1>Reset your password</h1>
        <div class="mb-3">
            <label for="email" class="form-label">Email address of account</label>
            <input type="text" placeholder="User's email" class="form-control" id="email" aria-describedby="emailHelp"
                v-model="email">
            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div class="mb-3">
            <label for="currentPassword" class="form-label">Current password</label>
            <input type="password" placeholder="Current password" class="form-control" id="currentPassword"
                v-model="currentPassword">
        </div>
        <div class="mb-3">
            <label for="newPassword" class="form-label">New password</label>
            <input type="password" placeholder="New password" class="form-control" id="newPassword" v-model="newPassword">
        </div>
        <button type="button" class="btn btn-primary" :disabled="isDisabled" @click.prevent="resetPassword()">
            Reset Password
        </button>
    </form>
</template>

<script lang="ts">
import { getAllInjectedUtils } from '@/utils/injector-utils';
import type { UserUtil } from '@/utils/userutils';


export default {
    data() {
        return {
            email: "",
            currentPassword: "",
            newPassword: "",
            $users: {} as UserUtil
        }
    },
    created() {
        const { $users } = getAllInjectedUtils();

        this.$data.$users = $users;
    },
    methods: {
        async resetPassword() {
            const response = await this.$data.$users.resetPassword(this.email, this.currentPassword, this.newPassword);

            if (response === true) {
                alert("Password reset successfully.");
                this.$router.push("/portal");
            } else {
                alert("Password reset failed.");
            }
        }
    },
    computed: {
        isDisabled() {
            return this.email === "" || this.currentPassword === "" || this.newPassword === "";
        }
    },
}

</script>