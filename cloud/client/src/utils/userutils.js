import { Product } from '../models/product';
import { User } from '../models/user'

export class UserUtil {
    STORAGE_USER_KEY = 'user';
    currentUser = null;
    currentProductId = 0;
    currentTestId = 0;
    isSignedIn = false;

    constructor() {
        this.currentUser = JSON.parse(localStorage.getItem(this.STORAGE_USER_KEY));
        this.isSignedIn = this.currentUser !== null && this.currentUser !== undefined;
    }

    getCurrentUser() {
        return this.currentUser;
    }

    async getUserByUserId(userId) {
        let allUsers =  await this.getAllUsers();
        return allUsers.find(user => user.id === userId);
    }

    async getAllUsers() {
        let allUsers = null;
        await fetch('users.json').
        then((response) => { return response.json()} ).
        then((data) => {
            allUsers = data;
        });

        return allUsers;
    }

    async signin(username, password) {
        let allUsers =  await this.getAllUsers();
        const usernameUser = allUsers.find(user => user?.name === username.trim());

        if(usernameUser === undefined) {
            return [false, "Username not found in list of users!"];
        }
        else {
            if(usernameUser.password !== password.trim()) {
                return [false, "Incorrect password!"];
            }
            else {
                console.log(usernameUser);
                this.currentUser = { 
                    name: usernameUser.name, 
                    id: usernameUser.id, 
                    level: usernameUser.level, 
                    account: usernameUser.account, 
                    active: usernameUser.active,
                    isSignedIn: true };
                localStorage.setItem(this.STORAGE_USER_KEY, JSON.stringify(this.currentUser));
                this.isSignedIn = true;
                return [true, "Successfully logged in!"];
            };
        };
    }

    signout() {
        this.currentUser = null;
        localStorage.removeItem(this.STORAGE_USER_KEY);
        this.isSignedIn = false;
        return [true, "Successfully logged out!"];
    }

    isUserCurrentlySignedIn() {
        return this.isSignedIn;
    }

    saveUserToLocalStorage() {
        localStorage.setItem(this.STORAGE_USER_KEY, JSON.stringify(this.currentUser));
    }

    async appendAndPersistNewUser(newUser) {
        //
    }
}