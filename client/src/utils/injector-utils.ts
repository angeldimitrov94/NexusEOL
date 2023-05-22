import { inject } from "@vue/runtime-core";
import { AccountUtilSymbol, EventBusSymbol, ProductUtilSymbol, UsersUtilSymbol } from "@/models/symbols";

function getAllInjectedUtils() {
    const $users = inject(UsersUtilSymbol);

    if(!$users) {
        throw new Error('UsersUtil could not be resolved');
    }

    const $products = inject(ProductUtilSymbol);

    if(!$products) {
        throw new Error('ProductUtil could not be resolved');
    }

    const $bus = inject(EventBusSymbol);

    if(!$bus) {
        throw new Error('EventBus could not be resolved');
    }

    const $accounts = inject(AccountUtilSymbol);

    if(!$accounts) {
        throw new Error('AccounUtil could not be resolved');
    }

    return {$users, $products, $bus, $accounts};
};

export { getAllInjectedUtils };