import { inject } from "@vue/runtime-core";
import type { ProductUtil } from "./productutils";
import type { EventBus } from "./eventbus";
import type { AccountUtil } from "./accountutils";
import type { UserUtil } from "./userutils";

function getAllInjectedUtils() {
    const $users : UserUtil | undefined = inject('$users');

    if(!$users) {
        throw new Error('UsersUtil could not be resolved');
    }

    const $products : ProductUtil | undefined = inject('$products');

    if(!$products) {
        throw new Error('ProductUtil could not be resolved');
    }

    const $bus : EventBus | undefined = inject('$bus');

    if(!$bus) {
        throw new Error('EventBus could not be resolved');
    }

    const $accounts : AccountUtil | undefined = inject('$accounts');

    if(!$accounts) {
        throw new Error('AccounUtil could not be resolved');
    }

    return {$users, $products, $bus, $accounts};
};

export { getAllInjectedUtils };