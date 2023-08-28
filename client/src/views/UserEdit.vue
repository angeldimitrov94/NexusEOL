<template>
    <div class="m-3">
        <h4>Edit user</h4>
        <form action="">
            <!--Email-->
            <div class="mb-3">
                <label for="name" class="form-label">User name</label>
                <input id="name" type="text" class="form-control" v-model="user.name" disabled="true"/>
            </div>
            <!--Email-->
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input id="email" type="email" pattern=".+@[A-Za-z0-9]+\.[A-Za-z0-9]{2,5}" class="form-control" v-model="user.email"/>
            </div>
            <!--User Level-->
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
            <button class="btn btn-warning me-2" @click.prevent="deleteUser()">Delete User</button>
            <button class="btn btn-primary me-2" @click.prevent="submit()" :disabled="isFormInvalid()">Confirm changes</button>
        </form>
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
            isSuperadmin: false,
            isAdmin: false,
            isBIUser: false,
            isTechnician: false,
            $users: {} as UserUtil,
        }
    },
    async created() {
        const { $users } = getAllInjectedUtils();

        this.$data.$users = $users;

        const userWithId = await this.$data.$users.getUser(this.id);

        console.log(userWithId);

        if (userWithId) {
            this.user = userWithId;
        }

        this.isActive = true;

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
                email: this.$data.user.email,
                level: this.$data.user.level,
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
            return this.$data.user.email === "";
        },
        async deleteUser() {
            if(this.$data.user.id) {
                const deletedUserResult = await this.$data.$users.deleteUser(this.$data.user.id);

                if(deletedUserResult) {
                    alert("User deleted successfully.");
                    this.$router.push("/portal/users");
                } else {
                    alert("User deletion failed.");
                }
            } else {
                alert("User deletion failed - no user id specified.");
            }
        }
    },
    watch: {
        isSuperadmin() {
            if (this.$data.isSuperadmin == true) {
                this.$data.user.level = UserRole.SUPERADMIN;
                this.$data.isAdmin = false;
                this.$data.isBIUser = false;
                this.$data.isTechnician = false;
            }
        },
        isAdmin() {
            if (this.$data.isAdmin) {
                this.$data.user.level = UserRole.ADMIN;
                this.$data.isSuperadmin = false;
                this.$data.isBIUser = false;
                this.$data.isTechnician = false;
            }
        },
        isBIUser() {
            if (this.$data.isBIUser) {
                this.$data.user.level = UserRole.BIUSER;
                this.$data.isAdmin = false;
                this.$data.isSuperadmin = false;
                this.$data.isTechnician = false;
            }
        },
        isTechnician() {
            if (this.$data.isTechnician) {
                this.$data.user.level = UserRole.TECHNICIAN;
                this.$data.isAdmin = false;
                this.$data.isBIUser = false;
                this.$data.isSuperadmin = false;
            }
        },
    }
}
</script>