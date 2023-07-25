<template>
    <div class="m-3">
        <h4>Edit user</h4>
        <div class="container text-center">
            <div class="row">
                <label class="form-label">
                    User level
                </label>
            </div>
            <div class="row">
                <div class="col">
                    <label class="form-check-label" for="gridCheck1">Superadmin</label>
                </div>
                <div class="col">
                    <input class="form-check-input" type="checkbox" v-model="isSuperadmin">
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <label class="form-check-label" for="gridCheck1">Admin</label>
                </div>
                <div class="col">
                    <input class="form-check-input" type="checkbox" v-model="isAdmin">
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <label class="form-check-label" for="gridCheck1">BIUser</label>
                </div>
                <div class="col">
                    <input class="form-check-input" type="checkbox" v-model="isBIUser">
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <label class="form-check-label" for="gridCheck1">Technician</label>
                </div>
                <div class="col">
                    <input class="form-check-input" type="checkbox" v-model="isTechnician">
                </div>
            </div>
            <!-- <div class="row">
                <div class="col">
                    <label for="" class="form-label">Is User Active</label>
                </div>
                <div class="col">
                    <input class="form-check-input" type="checkbox" v-model="isActive">
                </div>
            </div> -->
            <div class="row"><button class="btn btn-primary me-2" @click.prevent="submit">Confirm changes</button></div>
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
            $users: {} as UserUtil
        }
    },
    async created() {
        const { $users } = getAllInjectedUtils();

        this.$data.$users = $users;

        const userWithId = await this.$data.$users.getUser(this.id);

        if(userWithId !== undefined) {
            this.user = userWithId;
        }

        this.isActive = true;
        this.level = this.user.level;

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
        submit() {

        }
    },
    watch: {
        isSuperadmin() {
            if(this.isSuperadmin == true) {
                this.level = UserRole.SUPERADMIN;
                this.isAdmin = false;
                this.isBIUser = false;
                this.isTechnician = false;
            }
        },
        isAdmin() {
            if(this.isAdmin){
                this.level = UserRole.ADMIN;
                this.isSuperadmin = false;
                this.isBIUser = false;
                this.isTechnician = false;
            }
        },
        isBIUser() {
            if(this.isBIUser) {
                this.level = UserRole.BIUSER;
                this.isAdmin = false;
                this.isSuperadmin = false;
                this.isTechnician = false;
            }
        },
        isTechnician() {
            if(this.isTechnician) {
                this.level = UserRole.TECHNICIAN;
                this.isAdmin = false;
                this.isBIUser = false;
                this.isSuperadmin = false;
            }
        },
    }
}
</script>