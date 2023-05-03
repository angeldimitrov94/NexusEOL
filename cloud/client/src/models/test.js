export class Test {
    name = "";
    id = -1;
    description = "";
    messages = [];

    constructor(name, id, description) {
        if (name === '' || name === undefined || name === null) {
            throw new Error('Invalid test name');
        }

        if (id <= 0 || id === undefined || id === null) {
            throw new Error('Invalid test id');
        }

        if (description <= 0 || description === undefined || description === null) {
            throw new Error('Invalid test id');
        }

        this.name = name;
        this.id = id;
        this.description = description;
    }
}