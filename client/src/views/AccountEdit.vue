<template>
    <div class="m-3">
        <h4>Edit Account</h4>
        <form action="">
            <div class="mb-3">
                <label for="" class="form-label">
                    Account name
                </label>
                <input type="text" class="form-control" v-model="account.name" />
            </div>
            <div class="mb-3">
                <label for="" class="form-label">
                    ID (disabled for editing, auto-assigned upon creation of account)
                </label>
                <input type="text" class="form-control" disabled v-model="account.id" />
            </div>
            <div class="mb-3">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" v-model="account.active">
                    <label class="form-check-label" for="gridCheck1">Is Active</label>
                </div>
            </div>
        </form>
        <div class="mb-3">
            <button class="btn btn-primary me-2" @click.prevent="submit" :disabled="isFormInvalid">Confirm
                changes</button>
        </div>
    </div>
</template>

<script lang="ts">
import { Account } from '@/models/account';
import type { AccountUtil } from '@/utils/accountutils';
import type { EventBus } from '@/utils/eventbus';
import { getAllInjectedUtils } from '@/utils/injector-utils';

export default {
    props: { 
        id: { type: Number, default: -1 },
    },
    mounted() {
        this.id
    },
    async created() {
        const { $accounts } = getAllInjectedUtils();

        this.$data.$accounts = $accounts;

        const accountWithId = await this.$data.$accounts.getAccountById(this.id);

        if(accountWithId === undefined) {
            return;
        }

        this.account = accountWithId;
    },
    data() {
        return {
            account: new Account(),
            $bus: {} as EventBus,
            $accounts: {} as AccountUtil
        }
    },
    methods: {
        submit() {
            const updateResult = this.$data.$accounts.updateAccountWithId(this.id, this.account);

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
