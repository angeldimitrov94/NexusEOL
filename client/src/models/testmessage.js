export class TestMessage {
    static DEBUG = "DEBUG";
    static INFO = "INFO";
    static ERROR = "ERROR";

    dateTime = "";
    level = TestMessage.INFO;
    text = "";

    constructor(dateTime = new Date().toISOString(), level = TestMessage.INFO, text = "") {
        if(level !== TestMessage.DEBUG && level !== TestMessage.INFO || level !== TestMessage.ERROR) {
            throw new Error("Invalid message level");
        }

        if(text === undefined || text === "") {
            throw new Error("Invalid message text");
        }

        this.dateTime = dateTime;
        this.level = level;
        this.text = text;
    }
}