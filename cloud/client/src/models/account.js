export class Account {
    name = "";
    products = [];

    constructor(name, products = [])
    {
        if (name === '' || name === undefined || name === null) {
            throw new Error('Invalid account name');
        }

        this.products = products;
    }
}