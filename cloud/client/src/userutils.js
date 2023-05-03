import { Product } from './models/product';
import { User } from './models/user'

export class UserUtil {
    STORAGE_USER_KEY = 'user';
    currentUser = {};
    allUsers = [];
    currentProductId = 0;
    currentTestId = 0;
    productIdChangedEvent;
    testIdChangedEvent;

    constructor() {
        this.currentUser = JSON.parse(localStorage.getItem(this.STORAGE_USER_KEY));
        if(this.currentUser === null) {
            this.currentUser = new User();
            localStorage.setItem(this.STORAGE_USER_KEY, JSON.stringify(this.currentUser));
        }

        fetch('users.json').then((response) => response.json().then((json) => {
            this.allUsers = json;
        }))

        this.productIdChangedEvent = new CustomEvent('productIdChangedEvent', { newId: this.currentProductId });
        this.testIdChangedEvent = new CustomEvent('testIdChangedEvent', { newId: this.currentTestId });
    }

    getCurrentUser() {
        return this.currentUser;
    }

    signin(username, password) {
        const usernameUser = this.allUsers.find(user => user.name === username);

        if(usernameUser === undefined) {
            return [false, "Username not found in list of users!"];
        }
        else {
            if(usernameUser.password !== password) {
                return [false, "Incorrect password!"];
            }
            else {
                this.currentUser = { name: usernameUser.name, level: usernameUser.level, account: usernameUser.account, signedIn: true };
                console.log('signin - currentUser : ');
                console.log(this.currentUser);
                localStorage.setItem(this.STORAGE_USER_KEY, JSON.stringify(this.currentUser));
                return [true, "Successfully logged in!"];
            };
        };
    }

    signout() {
        this.currentUser = new User();
        localStorage.setItem(this.STORAGE_USER_KEY, JSON.stringify(this.currentUser));
        return [true, "Successfully logged out!"];
    }

    updateCurrentUserProducts(modifiedProducts) {
        if(modifiedProducts === null || modifiedProducts === undefined || !Array.isArray(modifiedProducts)) {
            throw new Error('Invalid modified products passed in');
        }

        this.currentUser.products = modifiedProducts;
    }

    getCurrentUserAllProducts() {
        console.log('getCurrentUserAllProducts - this.currentUser');
        console.log(this.currentUser);
        return this.currentUser?.account?.products;
    }

    getCurrentUserProductById(id) {
        const productWithId = this.currentUser?.account?.products?.find(product => product?.id === id);
        return (productWithId === undefined || productWithId === null) ? 
        new Product("N/A","N/A","N/A",[],false) : 
        productWithId;
    }

    getTestFromCurrentUser(productId, testId) {
        const product = this.getCurrentUserProductById(productId);
        return product.tests[testId];
    }

    getCurrentlySelectedProductId() {
        return this.currentProductId;
    }

    setCurrentlySelectedProductId(newProductId) {
        this.currentProductId = newProductId;
    }

    getCurrentlySelectedTestId() {
        return this.currentTestId;
    }

    setCurrentlySelectedTestId(newTestId) {
        this.currentTestId = newTestId;
    }
}