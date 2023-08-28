<template>
    <div class="m-3">
        <h1>Create a new account</h1>
        <div class="container mb-3">
            <form action="">
                <div class="mb-3">
                    <label for="" class="form-label">
                        Account name
                    </label>
                    <input type="text" class="form-control" v-model="name" />
                </div>
                <div class="mb-3">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" v-model="active">
                        <label class="form-check-label" for="gridCheck1">Is Active</label>
                    </div>
                </div>
                <div class="mb-3">
                    <button class="btn btn-primary" @click="submitForm()" :disabled="isFormInvalid">Create
                        Account</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import { EventBus } from '@/utils/eventbus';
import { getAllInjectedUtils } from '@/utils/injector-utils';
import { type AccountAttrs } from '@testsequencer/common';
import { UserUtil } from '@/utils/userutils';
import type { AccountUtil } from '@/utils/accountutils';

export default {
    props: {
        pageCreated: { type: Function }
    },
    mounted() {
        this.pageCreated
    },
    computed: {
        isFormInvalid(): boolean {
            return !this.$data.name;
        }
    },
    data() {
        return {
            name: '',
            active: true,
            $accounts: {} as AccountUtil,
            $bus: new EventBus(),
            $users: {} as UserUtil
        }
    },
    created() {
        const { $accounts, $bus, $users } = getAllInjectedUtils();

        this.$data.$accounts = $accounts;
        this.$data.$bus = $bus
        this.$data.$users = $users;
    },
    methods: {
        async submitForm() {
            if (!this.name) {
                alert('Missing data!');
                return;
            }

            try {
                const currentCookieUser = await this.$data.$users.getCurrentUser();

                const account = {} as AccountAttrs;
                account.name = this.name.trim();
                account.active = this.active;
                account.products = [];

                const createdProduct = await this.$data.$accounts.postNewAccount(account);

                if(createdProduct) {
                    this.$data.$bus.$emit('account-created', {
                        id: account.id,
                    });

                    alert(`New account created!\r\n${JSON.stringify(account)}`);
                }
                else {
                    alert(`Failed to create new account!`);
                }
            } catch (error) {
                alert(`Failed to create new account! - ${error}`);
                console.error(error);
            }

            this.name = '';
            this.active = true;
        }
    }
}
</script>