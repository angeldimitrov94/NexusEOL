export class Product {
    static NOT_STARTED = "Tests not started";
    static RUNNING = "Tests running";
    static COMPLETE_FAIL = "Complete - test failed";
    static COMPLETE_SUCCESS = "Complete - all tests successful";

    name = "";
    id = -1;
    description = "";
    tests = [];
    active = false;
    currentTestId = -1;
    state = Product.NOT_STARTED;

    constructor(name, description, tests, active = false) {
        if (name === '' || name === undefined || name === null) {
            throw new Error('Invalid product name');
        }

        if (description === ''|| description === undefined || description === null) {
            throw new Error('Invalid product description');
        }

        if (tests === undefined || tests === null) {
            throw new Error('Invalid product test');
        }

        this.name = name;
        this.id = btoa(name.concat('%',Date.now()));
        this.description = description;
        this.tests = tests;
        this.active = active;
    }
}