<template>
    <div class="m-3">
        <h1>Create a new user</h1>
        <div class="container mb-3">
            <form action="">
                <!--Name-->
                <div class="mb-3">
                    <label for="" class="form-label">
                        User name
                    </label>
                    <input type="text" class="form-control" v-model="name" />
                </div>
                <!--Email-->
                <div class="mb-3">
                    <label for="" class="form-label">
                        Email
                    </label>
                    <textarea type="email" class="form-control" rows="5" v-model="email"></textarea>
                </div>
                <!--User Level-->
                <div class="mb-3">
                    <label class="form-label">
                        User level
                    </label>
                    <div class="mb-3">
                        <div class="col">
                            <label class="form-check-label" for="gridCheck1">Superadmin</label>
                        </div>
                        <div class="col">
                            <input class="form-check-input" type="checkbox" v-model="isSuperadmin">
                        </div>
                    </div>
                    <div class="mb-3">
                        <div class="col">
                            <label class="form-check-label" for="gridCheck1">Admin</label>
                        </div>
                        <div class="col">
                            <input class="form-check-input" type="checkbox" v-model="isAdmin">
                        </div>
                    </div>
                    <div class="mb-3">
                        <div class="col">
                            <label class="form-check-label" for="gridCheck1">BIUser</label>
                        </div>
                        <div class="col">
                            <input class="form-check-input" type="checkbox" v-model="isBIUser">
                        </div>
                    </div>
                    <div class="mb-3">
                        <div class="col">
                            <label class="form-check-label" for="gridCheck1">Technician</label>
                        </div>
                        <div class="col">
                            <input class="form-check-input" type="checkbox" v-model="isTechnician">
                        </div>
                    </div>
                </div>
                <!--Account ID-->
                <div class="mb-3">
                    <label for="" class="form-label">
                        Account ID
                    </label>
                    <input type="text" class="form-control" v-model="accountId" />
                </div>
                <!--Password-->
                <div class="mb-3">
                    <label for="" class="form-label">
                        Password
                    </label>
                    <input type="password" class="form-control" v-model="initialPassword" />
                </div>
                <div class="mb-3">
                    <button class="btn btn-primary" @click.prevent="submitForm" :disabled="isFormInvalid()">Create
                        User</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts">
import { getAllInjectedUtils } from '@/utils/injector-utils';
import { UserUtil } from '@/utils/userutils';
import { UserRole, type UserAttrs } from '@testsequencer/common';
export default {
    data() {
        return {
            name: "",
            email: "",
            isSuperadmin: false,
            isAdmin: false,
            isBIUser: false,
            isTechnician: false,
            accountId: "",
            initialPassword: "",
            $users: {} as UserUtil,
            level: UserRole.TECHNICIAN
        }
    },
    async created() {
        const { $users } = getAllInjectedUtils();

        this.$data.$users = $users;
    },
    methods: {
        async submitForm() {
            const newUser = {
                name: this.$data.name,
                email: this.$data.email,
                level: this.$data.level,
                accountId: this.$data.accountId,
                password: this.$data.initialPassword
            } as UserAttrs;

            const response = await this.$data.$users.postUser(newUser);

            if (response) {
                alert("User created successfully.");
                this.$router.push("/portal/users");
            } else {
                alert("User creation failed.");
            }
        },
        isFormInvalid(): boolean {
            return this.$data.name === "" || this.$data.email === "" || this.$data.accountId === "" || this.$data.initialPassword === "";
        }
    },
    watch: {
        isSuperadmin() {
            if(this.$data.isSuperadmin == true) {
                this.$data.level = UserRole.SUPERADMIN;
                this.$data.isAdmin = false;
                this.$data.isBIUser = false;
                this.$data.isTechnician = false;
            }
        },
        isAdmin() {
            if(this.$data.isAdmin){
                this.$data.level = UserRole.ADMIN;
                this.$data.isSuperadmin = false;
                this.$data.isBIUser = false;
                this.$data.isTechnician = false;
            }
        },
        isBIUser() {
            if(this.$data.isBIUser) {
                this.$data.level = UserRole.BIUSER;
                this.$data.isAdmin = false;
                this.$data.isSuperadmin = false;
                this.$data.isTechnician = false;
            }
        },
        isTechnician() {
            if(this.$data.isTechnician) {
                this.$data.level = UserRole.TECHNICIAN;
                this.$data.isAdmin = false;
                this.$data.isBIUser = false;
                this.$data.isSuperadmin = false;
            }
        },
    }
}
</script>