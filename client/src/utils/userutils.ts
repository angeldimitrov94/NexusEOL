import type { UserWithPassword } from '@/models/user-with-password';
import { User } from '../models/user'

export class UserUtil {
    readonly STORAGE_USER_KEY : string = 'user';
    currentUser : User = new User();
    currentProductId : string = "";
    currentTestId : string = "";
    isSignedIn : boolean = false;

    constructor() {
        const localStorageUser = localStorage.getItem(this.STORAGE_USER_KEY);
        
        if(localStorageUser) {
            const localStorageUserJson = JSON.parse(localStorageUser);

            if(localStorageUserJson.name && localStorageUserJson.id && 
                localStorageUserJson.level && localStorageUserJson.signedIn && 
                localStorageUserJson.active && localStorageUserJson.account &&
                localStorageUserJson.products)
            {
                this.currentUser.name = localStorageUserJson.name;
                this.currentUser.id = localStorageUserJson.id;
                this.currentUser.level = localStorageUserJson.level;
                this.currentUser.signedIn = localStorageUserJson.signedIn;
                this.currentUser.active = localStorageUserJson.active;
                this.currentUser.account = localStorageUserJson.account;
                this.currentUser.products = localStorageUserJson.products;
                this.isSignedIn = !this.currentUser.isDefault();
            }
        }
    }

    getCurrentUser(): User {
        return this.currentUser;
    }

    async getUserByUserId(userId: string) {
        let allUsers = await this.getAllUsers();
        return allUsers.find(user => user.id === userId);
    }

    async getAllUsers(): Promise<User[]> {
        let allUsers : User[] = [];
        await fetch('users.json').
        then((response) => { return response.json()} ).
        then((data) => {
            allUsers = data;
        });

        return allUsers;
    }

    private async getAllUsersWithPassword(): Promise<UserWithPassword[]> {
        let allUsers : UserWithPassword[] = [];
        await fetch('users.json').
        then((response) => { return response.json()} ).
        then((data) => {
            allUsers = data;
        });

        return allUsers;
    }

    async signin(username: string, password: string): Promise<[success: boolean, message: string]> {
        let allUsers =  await this.getAllUsersWithPassword();
        const usernameUser = allUsers.find(user => user?.name === username.trim());

        if(usernameUser === undefined) {
            return [false, "Username not found in list of users!"];
        }
        else {
            if(usernameUser.password !== password.trim()) {
                return [false, "Incorrect password!"];
            }
            else {
                this.currentUser.name = usernameUser.name;
                this.currentUser.id =  usernameUser.id;
                this.currentUser.level = usernameUser.level, 
                this.currentUser.account =  usernameUser.account, 
                this.currentUser.active =  usernameUser.active,
                this.currentUser.signedIn =  true,
                this.currentUser.products =  usernameUser.products

                localStorage.setItem(this.STORAGE_USER_KEY, JSON.stringify(this.currentUser));
                this.isSignedIn = true;
                return [true, "Successfully logged in!"];
            };
        };
    }

    signout(): [success: boolean, message: string] {
        this.currentUser = new User();
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

    async appendAndPersistNewUser(newUser: User) {
        //
    }
}