import { inject } from "@vue/runtime-core";

function getAllInjectedUtils() {
    const $users = inject('$users');

    if(!$users) {
        throw new Error('UsersUtil could not be resolved');
    }

    const $products = inject('$products');

    if(!$products) {
        throw new Error('ProductUtil could not be resolved');
    }

    const $bus = inject('$bus');

    if(!$bus) {
        throw new Error('EventBus could not be resolved');
    }

    const $accounts = inject('$accounts');

    if(!$accounts) {
        throw new Error('AccounUtil could not be resolved');
    }

    return {$users, $products, $bus, $accounts};
};

export { getAllInjectedUtils };