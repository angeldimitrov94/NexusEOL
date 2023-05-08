import { Account } from './account';

export class User { 
    static SUPERADMIN = "superadmin";
    static ADMIN = "admin";
    static BIUSER = "biuser";
    static TECHNICIAN = "technician";

    name = "";
    id = "";
    level = "";
    account = {};
    signedIn = false;
    active = true;

    constructor(name = "", level = User.TECHNICIAN, accountName, signedIn = false, active = true) {
        this.name = name;
        this.level = level;
        this.account = new Account(accountName);
        this.signedIn = signedIn;
        this.id = btoa(name.concat('%',Date.now(),'%',level,'%',accountName));
    }
};