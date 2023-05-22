import type { Product } from "./product";

export class Account {
    name: string = "";
    products: Product[] = [];
    id: number = -1;
    active: boolean = false;

    isDefault(): boolean {
        return this.name === "" &&
        this.id === -1
    }
}