import { ProductState } from "./product-state";
import { Test } from "./test";

export class Product {
    name: string = "";
    id: string = "";
    description: string = "";
    active: boolean = false;
    currentTestId: number = -1;
    state: ProductState = ProductState.NOT_STARTED;
    tests: Test[] = [];
}