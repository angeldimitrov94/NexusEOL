import type CookieUser from "@/models/cookie-user";
import { type UserAttrs } from "@testsequencer/common";
import axios from "axios";

export class UserUtil {
    cachedCookieUser: CookieUser|null; 
    initialized: boolean;

    constructor() {
        this.initialized = false;
        this.cachedCookieUser = null;
    }

    initialize() {
        this.getCurrentUser().then((cookieUser: CookieUser) => {
            this.initialized = cookieUser !== undefined;
        });
    }

    async getUser(userId: string): Promise<UserAttrs | undefined> {
        const { data, status } = await axios.get(`https://api.nexuseol.com/users/${userId}`, 
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
        const { data, status } = await axios.get(`https://api.nexuseol.com/users`, 
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
        const { data, status } = await axios.post(`https://api.nexuseol.com/users/create`, user, 
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
        const { data, status } = await axios.patch(`https://api.nexuseol.com/users/${user.__id}/edit`, user, 
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
        const { data, status } = await axios.post(`https://api.nexuseol.com/auth/signin`, {
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
        const { data, status } = await axios.post(`https://api.nexuseol.com/auth/signout`, 
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
        return this.cachedCookieUser !== null;
    }

    async getCurrentUser(): Promise<CookieUser> {
        const { data, status } = await axios.get(`https://api.nexuseol.com/auth/currentuser`, 
        {
            validateStatus: function (status: number) {
                return status < 500; // Resolve only if the status code is less than 500
            }
        });

        console.log('data.currentUser : '+data?.currentUser);
        
        const success = status === 200;
        if(!success) {
            console.error(data);
        }

        const currentUser: CookieUser = data.currentUser as CookieUser;

        return currentUser;
    }
}