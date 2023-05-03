export class User { 
    name = "";
    level = "";
    account = {};
    signedIn = false;

    constructor(name = "", level = "", account = {}, signedIn = false) {
        this.name = name;
        this.level = level;
        this.account = account;
        this.signedIn = signedIn;
    }
};