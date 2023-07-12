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
                <input type="text" class="form-control" disabled v-model="account.__id" />
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
import type { AccountUtil } from '@/utils/accountutils';
import type { EventBus } from '@/utils/eventbus';
import { getAllInjectedUtils } from '@/utils/injector-utils';
import { type AccountAttrs } from '@testsequencer/common';

export default {
    props: { 
        id: { type: String, default: "" },
    },
    mounted() {
        this.id
    },
    async created() {
        const { $accounts } = getAllInjectedUtils();

        this.$data.$accounts = $accounts;

        const accountWithId = await this.$data.$accounts.getAccount(this.id);

        if(accountWithId === undefined) {
            return;
        }

        this.account = accountWithId;
    },
    data() {
        return {
            account: {} as AccountAttrs,
            $bus: {} as EventBus,
            $accounts: {} as AccountUtil
        }
    },
    methods: {
        submit() {
            const updateResult = this.$data.$accounts.patchAccount(this.id, this.account);

            if (updateResult === null) {
                alert('Failed to update account.');
                return;
            }

            this.$router.push({ path: '/portal/accounts/manage' });
        }
    },
    computed: {
        isFormInvalid() {
            return !this.account.name;
        }
    }
}
</script>
