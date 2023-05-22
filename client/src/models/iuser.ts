import type { Account } from "./account";
import type { Product } from "./product";
import type { UserRole } from "./user-role";

export interface IUser {
    name: string;
    id: string;
    level: UserRole;
    signedIn: boolean;
    active: boolean;
    account: Account;
    products: Product[];
}