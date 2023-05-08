<template>
    <div class="m-3">
        <h4>Edit Account</h4>
        <form action="">
            <div class="mb-3">
                <label for="" class="form-label">
                    Account name
                </label>
                <input type="text" class="form-control" v-model="this.account.name" />
            </div>
            <div class="mb-3">
                <label for="" class="form-label">
                    ID (disabled for editing, auto-assigned upon creation of account)
                </label>
                <input type="text" class="form-control" disabled v-model="this.account.id" />
            </div>
            <div class="mb-3">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" v-model="this.account.active">
                    <label class="form-check-label" for="gridCheck1">Is Active</label>
                </div>
            </div>
        </form>
        <div class="mb-3">
            <button class="btn btn-primary me-2" @click.prevent="submit" :disabled="this.isFormInvalid">Confirm
                changes</button>
        </div>
    </div>
</template>

<script>
export default {
    inject: ['$bus', '$accounts'],
    props: ['id'],
    created() {
        this.account = this.$accounts.getAccountById(this.id);
    },
    data() {
        return {
            account: null
        }
    },
    methods: {
        submit() {
            const updateResult = this.$accounts.updateAccountWithId(this.id, this.account);

            if (updateResult === null) {
                alert('Failed to update account.');
                return;
            }

            this.$router.push({ path: '/accounts/manage' });
        }
    },
    computed: {
        isFormInvalid() {
            return !this.account.name;
        }
    }
}
</script>
