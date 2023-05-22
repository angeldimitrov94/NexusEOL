import { Test } from '@/models/test';
import { Product } from '../models/product';
import { UserUtil } from './userutils';

export class ProductUtil {
    userUtil: UserUtil = new UserUtil();
    currentProductId = "";
    currentTestId = "";

    updateCurrentUserProducts(modifiedProducts: Array<Product>) {
        if(modifiedProducts === null || modifiedProducts === undefined || !Array.isArray(modifiedProducts)) {
            console.error('Invalid modified products passed in. Not modifying products.');
            return;
        }

        const currentUser = this.userUtil.getCurrentUser();

        if(currentUser === null) {
            console.error('Current user is null. Not modifying any products.');
            return;
        }

        currentUser.products = modifiedProducts;
        this.userUtil.saveUserToLocalStorage();

        return true;
    }

    updateCurrentUserProductWithId(productId: string, modifiedProduct: Product) {
        if(modifiedProduct === null || modifiedProduct === undefined) {
            console.error('Invalid modified product passed in. Not modifying product.');
            return;
        }

        const currentUser = this.userUtil.getCurrentUser();

        if(currentUser === null) {
            console.error('Current user is null. Not modifying any products.');
            return;
        }

        let existingProduct = this.getCurrentUserAllProducts().find(product => product.id === productId);
        console.log(this.getCurrentUserAllProducts());
        console.log(existingProduct);
        if(existingProduct === undefined) {
            console.error('Product with this id does not exist. Not modifying this product.')
            return;
        }

        existingProduct = modifiedProduct;
        this.userUtil.saveUserToLocalStorage();

        return true;
    }

    updateCurrentUserTestWithId(productId: string, testId: string, modifiedTest: Test) {
        if(modifiedTest === null || modifiedTest === undefined) {
            console.error('Invalid modified test passed in. Not modifying test.');
            return;
        }

        const currentUser = this.userUtil.getCurrentUser();

        if(currentUser === null) {
            console.error('Current user is null. Not modifying test.');
            return;
        }

        const existingProduct = this.getCurrentUserAllProducts().find(product => product.id === productId);
        if(existingProduct === undefined) {
            console.error('Product with this productId does not exist. Not modifying this test.')
            return;
        }

        let existingTest = existingProduct.tests.find(test => test.id === testId);
        if(existingTest === undefined) {
            console.error('Test with this testId does not exist. Not modifying this test.')
            return;
        }

        existingTest = modifiedTest;
        this.userUtil.saveUserToLocalStorage();

        return true;
    }

    createNewProductForCurrentUser(newProduct: Product) {
        if(newProduct === null || newProduct === undefined) {
            console.error('Invalid new product passed in. Not creating product.');
            return;
        }

        const currentUser = this.userUtil.getCurrentUser();

        if(currentUser === null) {
            console.error('Current user is null. Not creating product.');
            return;
        }

        const allProducts = this.getCurrentUserAllProducts();
        if(allProducts.find(product => product.id === newProduct.id) !== undefined) {
            console.error(`Product with id ${newProduct.id} already exists. Not creating product.`);
            return;
        }

        allProducts.push(newProduct);
        this.userUtil.saveUserToLocalStorage();

        return true;
    }

    createNewTestForCurrentUser(productId: string, newTest: Test) {
        if(newTest === null || newTest === undefined) {
            console.error('Invalid new test passed in. Not creating test.');
            return;
        }

        const currentUser = this.userUtil.getCurrentUser();

        if(currentUser === null) {
            console.error('Current user is null. Not creating test.');
            return;
        }

        const existingProduct = this.getCurrentUserAllProducts().find(product => product.id === productId);
        if(existingProduct === undefined) {
            console.error('Product with this productId does not exist. Not adding this test.')
            return;
        }

        const testWithTestId = existingProduct.tests.find(test => test.id === newTest.id);
        if(testWithTestId !== undefined) {
            console.error(`Test with id ${newTest.id} already exists. Not creating test.`);
            return;
        }

        existingProduct.tests.push(newTest);
        this.userUtil.saveUserToLocalStorage();

        return true;
    }

    getCurrentUserAllProducts(): Product[] {
        return this.userUtil.getCurrentUser()?.account?.products;
    }

    getCurrentUserProductById(productId: string): Product | undefined {
        const currentUser = this.userUtil.getCurrentUser();
        return currentUser.account?.products?.find(product => product?.id === productId);
    }

    getTestFromCurrentUser(productId: string, testId: string): Test | undefined {
        return this.getCurrentUserProductById(productId)?.tests.find(test => test.id === testId);
    }
}