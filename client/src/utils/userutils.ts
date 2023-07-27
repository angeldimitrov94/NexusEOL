import type CookieUser from "@/models/cookie-user";
import { type UserAttrs } from "@testsequencer/common";
import axios from "axios";

export class UserUtil {
    initialized: boolean;
    readonly nexusEolDomain: string = "www.nexuseol.com";
    usersApiRoute: string = "/api/users";
    authApiRoute: string = "/api/auth";
    readonly usersBaseUrl: string;
    readonly authBaseUrl: string;

    constructor(devFlag: boolean) {
        this.initialized = false;

        if(devFlag === true) {
            this.usersBaseUrl = `https://localhost${this.usersApiRoute}`;
            this.authBaseUrl = `https://localhost${this.authApiRoute}`;
        }
        else {
            this.usersBaseUrl = `https://${this.nexusEolDomain}${this.usersApiRoute}`;
            this.authBaseUrl = `https://${this.nexusEolDomain}${this.authApiRoute}`;
        }
    }

    initialize() {
        this.getCurrentUser().then((cookieUser: CookieUser) => {
            this.initialized = cookieUser !== undefined;
        });
    }

    async getUser(userId: string): Promise<UserAttrs | undefined> {
        const { data, status } = await axios.get(`${this.usersBaseUrl}/${userId}`, 
        {
            validateStatus: function (status: number) {
                return status < 500; // Resolve only if the status code is less than 500
            }
        });

        const success = status === 200;
        if(!success) {
            console.error(data);
            return undefined;
        }
        else {
            return data as UserAttrs;
        }
    }

    async getAllUsers(): Promise<UserAttrs[]> {
        const { data, status } = await axios.get(this.usersBaseUrl, 
        {
            validateStatus: function (status: number) {
                return status < 500; // Resolve only if the status code is less than 500
            }
        });

        const success = status === 200;
        if(!success) {
            console.error(data);
            return [];
        }
        else {
            return data as UserAttrs[];
        }
    }

    async postUser(user: UserAttrs): Promise<UserAttrs|undefined> {
        const { data, status } = await axios.post(`${this.usersBaseUrl}/create`, user, 
        {
            validateStatus: function (status: number) {
                return status < 500; // Resolve only if the status code is less than 500
            }
        });

        const success = status === 201;
        if(!success) {
            console.error(data);
            return undefined;
        }
        else {
            return data as UserAttrs;
        }
    } 

    async patchUser(user: UserAttrs): Promise<UserAttrs|undefined> {
        const { data, status } = await axios.patch(`${this.usersBaseUrl}/${user.id}/edit`, user, 
        {
            validateStatus: function (status: number) {
                return status < 500; // Resolve only if the status code is less than 500
            }
        });

        const success = status === 200;
        if(!success) {
            console.error(data);
            return undefined;
        }
        else {
            return data as UserAttrs;
        }
    } 

    async signin(email: string, password: string): Promise<UserAttrs|string|object> {
        const { data, status } = await axios.post(`${this.authBaseUrl}/signin`, {
            email,
            password
        }, 
        {
            validateStatus: function (status: number) {
                return status < 500; // Resolve only if the status code is less than 500
            }
        });

        const success = status === 200;
        if(!success) {
            return data;
        }

        return data as UserAttrs;
    }

    async signout(): Promise<boolean> {
        const { data, status } = await axios.post(`${this.authBaseUrl}/signout`, 
        {
            validateStatus: function (status: number) {
                return status < 500; // Resolve only if the status code is less than 500
            }
        });

        const success = status === 200;
        if(!success) {
            console.error(data);
            alert(data.errors);
            return false;
        }

        return true;
    }

    async isUserCurrentlySignedIn(): Promise<boolean> {
        const { data, status } = await axios.get(`${this.authBaseUrl}/signedin`, 
        {
            validateStatus: function (status: number) {
                return status < 500; // Resolve only if the status code is less than 500
            }
        });
        
        const success = status === 200;
        if(!success) {
            console.error(data);
        }

        return data.signedIn as boolean;
    }

    async getCurrentUser(): Promise<CookieUser> {
        const { data, status } = await axios.get(`${this.authBaseUrl}/currentuser`, 
        {
            validateStatus: function (status: number) {
                return status < 500; // Resolve only if the status code is less than 500
            }
        });
        
        const success = status === 200;
        if(!success) {
            console.error(data);
        }

        const currentUser: CookieUser = data.currentUser as CookieUser;

        return currentUser;
    }
}