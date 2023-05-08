export class Account {
    name = "";
    products = [];
    id = "";
    active = true;

    constructor(name, products = [])
    {
        if (name === '' || name === undefined || name === null) {
            throw new Error('Invalid account name');
        }

        this.products = products;
        this.id = btoa(name.concat('%',Date.now()));
    }
}