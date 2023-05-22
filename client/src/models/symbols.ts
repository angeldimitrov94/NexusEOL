import type { AccountUtil } from "@/utils/accountutils";
import type { EventBus } from "@/utils/eventbus";
import type { ProductUtil } from "@/utils/productutils";
import type { UserUtil } from "@/utils/userutils";
import type { InjectionKey, Ref } from "vue";

export const usersKey: string = '$users';
export const productsKey: string = '$products';
export const accountsKey: string = '$accounts';
export const busKey: string = '$bus';

export const UsersUtilSymbol: InjectionKey<UserUtil> = Symbol(usersKey);
export const ProductUtilSymbol: InjectionKey<ProductUtil> = Symbol(productsKey);
export const AccountUtilSymbol: InjectionKey<AccountUtil> = Symbol(accountsKey);
export const EventBusSymbol: InjectionKey<EventBus> = Symbol(busKey);