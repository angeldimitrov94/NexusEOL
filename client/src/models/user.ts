import { Account } from "./account";
import type { IUser } from "./iuser";
import type { Product } from "./product";
import { UserRole } from "./user-role";

export class User implements IUser {
    name: string = "";
    id: string = "";
    level: UserRole = UserRole.TECHNICIAN;
    signedIn: boolean = false;
    active: boolean = false;
    account: Account = new Account();
    products: Product[] = [];

    isDefault(): boolean {
        return this.name === "" && 
        this.id === "" && 
        this.account.isDefault() === true
    };
}