export class Test {
    static NOT_STARTED = "Not started";
    static RUNNING = "Running";
    static FAULTED = "Faulted";
    static PAUSED = "Paused";
    static RESUMED = "Resumed";
    static COMPLETED_FAIL = "Complete - fail";
    static COMPLETED_SUCCESS = "Complete - success";

    name = "";
    id = -1;
    description = "";
    messages = [];
    state = Test.NOT_STARTED;
    active = true;

    constructor(name, description) {
        if (name === '' || name === undefined || name === null) {
            throw new Error('Invalid test name');
        }

        if (description <= 0 || description === undefined || description === null) {
            throw new Error('Invalid test id');
        }

        this.name = name;
        this.id = btoa(name.concat('%',Date.now()));;
        this.description = description;
    }
}