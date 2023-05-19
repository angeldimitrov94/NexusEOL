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
                    <input class="form-check-input" type="checkbox" v-model="this.isSuperadmin">
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <label class="form-check-label" for="gridCheck1">Admin</label>
                </div>
                <div class="col">
                    <input class="form-check-input" type="checkbox" v-model="this.isAdmin">
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <label class="form-check-label" for="gridCheck1">BIUser</label>
                </div>
                <div class="col">
                    <input class="form-check-input" type="checkbox" v-model="this.isBIUser">
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <label class="form-check-label" for="gridCheck1">Technician</label>
                </div>
                <div class="col">
                    <input class="form-check-input" type="checkbox" v-model="this.isTechnician">
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <label for="" class="form-label">Is User Active</label>
                </div>
                <div class="col">
                    <input class="form-check-input" type="checkbox" v-model="this.isActive">
                </div>
            </div>
            <div class="row"><button class="btn btn-primary me-2" @click.prevent="submit">Confirm changes</button></div>
        </div>
    </div>
</template>
<script>
import { User } from '../models/user';
export default {
    props: ['id'],
    inject: ['$users'],
    data() {
        return {
            user: null,
            isActive: false,
            level: User.TECHNICIAN,
            isSuperadmin: false,
            isAdmin: false,
            isBIUser: false,
            isTechnician: false
        }
    },
    async created() {
        this.user = await this.$users.getUserByUserId(this.id);
        this.isActive = this.user.active;
        this.level = this.user.level;

        switch (this.user.level) {
            case User.SUPERADMIN:
                this.isSuperadmin = true;
                break;
            case User.ADMIN:
                this.isAdmin = true;
                break;
            case User.BIUSER:
                this.isBIUser = true;
                break;
            case User.TECHNICIAN:
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
                this.level = User.SUPERADMIN;
                this.isAdmin = false;
                this.isBIUser = false;
                this.isTechnician = false;
            }
        },
        isAdmin() {
            if(this.isAdmin){
                this.level = User.ADMIN;
                this.isSuperadmin = false;
                this.isBIUser = false;
                this.isTechnician = false;
            }
        },
        isBIUser() {
            if(this.isBIUser) {
                this.level = User.BIUSER;
                this.isAdmin = false;
                this.isSuperadmin = false;
                this.isTechnician = false;
            }
        },
        isTechnician() {
            if(this.isTechnician) {
                this.level = User.TECHNICIAN;
                this.isAdmin = false;
                this.isBIUser = false;
                this.isSuperadmin = false;
            }
        },
    }
}
</script>