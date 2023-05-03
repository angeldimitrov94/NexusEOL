export class Product {
    name = "";
    id = '-1';
    description = "";
    tests = [];
    active = false;

    constructor(name, id, description, tests, active = false) {
        if (name === '' || name === undefined || name === null) {
            throw new Error('Invalid product name');
        }

        if (id  === '' || id === undefined || id === null) {
            throw new Error('Invalid product id');
        }

        if (description === ''|| description === undefined || description === null) {
            throw new Error('Invalid product description');
        }

        if (tests === undefined || tests === null) {
            throw new Error('Invalid product test');
        }

        this.name = name;
        this.id = id;
        this.description = description;
        this.tests = tests;
        this.active = active;
    }
}