<template>
    <div class="m-3">
        <h4>Edit user</h4>
        <div class="container text-center">
            <!--Email-->
            <div class="mb-3">
                <label for="" class="form-label">
                    Email
                </label>
                <textarea type="email" class="form-control" rows="5" v-model="email"></textarea>
            </div>
            <div class="mb-3">
                <label class="form-label">
                    User level
                </label>
            </div>
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
            <button class="btn btn-primary me-2" @click.prevent="submit" :disabled="isFormInvalid()">Confirm changes</button>
        </div>
    </div>
</template>
<script lang="ts">
import { getAllInjectedUtils } from '@/utils/injector-utils';
import { UserUtil } from '@/utils/userutils';
import { UserRole, type UserAttrs } from '@testsequencer/common';
export default {
    props: {
        id: { type: String, default: "" },
    },
    data() {
        return {
            user: {} as UserAttrs,
            isActive: false,
            level: "",
            isSuperadmin: false,
            isAdmin: false,
            isBIUser: false,
            isTechnician: false,
            $users: {} as UserUtil,
            email: ""
        }
    },
    async created() {
        const { $users } = getAllInjectedUtils();

        this.$data.$users = $users;

        const userWithId = await this.$data.$users.getUser(this.id);

        if (userWithId !== undefined) {
            this.user = userWithId;
        }

        this.isActive = true;
        this.level = this.user.level;
        this.email = this.user.email;

        switch (this.user.level) {
            case UserRole.TECHNICIAN:
                this.isSuperadmin = true;
                break;
            case UserRole.ADMIN:
                this.isAdmin = true;
                break;
            case UserRole.BIUSER:
                this.isBIUser = true;
                break;
            case UserRole.TECHNICIAN:
                this.isTechnician = true;
                break;
            default:
                break;
        }
    },
    methods: {
        async submit() {
            const updatedUser = {
                id: this.$data.user.id,
                name: this.$data.user.name,
                email: this.$data.email,
                level: this.$data.level,
                accountId: this.$data.user.accountId,
                password: this.$data.user.password
            } as UserAttrs;

            const updatedUserResult = await this.$data.$users.patchUser(updatedUser);

            if(updatedUserResult) {
                alert("User updated successfully.");
                this.$router.push("/portal/users");
            } else {
                alert("User update failed.");
            }
        },
        isFormInvalid() {
            return this.$data.email === "";
        }
    },
    watch: {
        isSuperadmin() {
            if (this.$data.isSuperadmin == true) {
                this.$data.level = UserRole.SUPERADMIN;
                this.$data.isAdmin = false;
                this.$data.isBIUser = false;
                this.$data.isTechnician = false;
            }
        },
        isAdmin() {
            if (this.$data.isAdmin) {
                this.$data.level = UserRole.ADMIN;
                this.$data.isSuperadmin = false;
                this.$data.isBIUser = false;
                this.$data.isTechnician = false;
            }
        },
        isBIUser() {
            if (this.$data.isBIUser) {
                this.$data.level = UserRole.BIUSER;
                this.$data.isAdmin = false;
                this.$data.isSuperadmin = false;
                this.$data.isTechnician = false;
            }
        },
        isTechnician() {
            if (this.$data.isTechnician) {
                this.$data.level = UserRole.TECHNICIAN;
                this.$data.isAdmin = false;
                this.$data.isBIUser = false;
                this.$data.isSuperadmin = false;
            }
        },
    }
}
</script>