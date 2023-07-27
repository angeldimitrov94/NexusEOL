import type { ProductAttrs, TestAttrs } from '@testsequencer/common';
import { UserUtil } from './userutils';
import axios from 'axios';

export class ProductUtil {
    readonly nexusEolDomain: string = "www.nexuseol.com";
    productsApiRoute: string = "/api/products";
    testsApiRoute: string = "/api/tests";
    readonly baseProductUrl: string;
    readonly baseTestsUrl: string;

    constructor(devFlag: boolean) {
        this.userUtil = new UserUtil(devFlag)

        if(devFlag === true) {
            this.baseProductUrl = `https://localhost${this.productsApiRoute}`;
            this.baseTestsUrl = `https://localhost${this.testsApiRoute}`;
        }
        else {
            this.baseProductUrl = `https://${this.nexusEolDomain}${this.productsApiRoute}`;
            this.baseTestsUrl = `https://${this.nexusEolDomain}${this.testsApiRoute}`;
        }
    }

    userUtil: UserUtil;
    currentProductId = "";
    currentTestId = "";

    async patchProduct(modifiedProduct: ProductAttrs): Promise<ProductAttrs|undefined> {
        if(modifiedProduct === null || modifiedProduct === undefined) {
            console.error('Invalid modified product passed in. Not modifying product.');
            return;
        }

        const { data, status } = await axios.patch(`${this.baseProductUrl}/${modifiedProduct.id}/edit`, {
            productDoc: modifiedProduct
        });

        const success = status === 200;
        if(!success) {
            console.error(data);
            return;
        }

        return data as ProductAttrs;
    }

    async patchTest(modifiedTest: TestAttrs): Promise<TestAttrs|undefined> {
        if(modifiedTest === null || modifiedTest === undefined) {
            console.error('Invalid modified test passed in. Not modifying test.');
            return;
        }

        const { data, status } = await axios.patch(`${this.baseTestsUrl}/${modifiedTest.id}/edit`, {
            testDoc: modifiedTest
        });

        const success = status === 200;
        if(!success) {
            console.error(data);
            return;
        }

        return data as TestAttrs;
    }

    async postProduct(productAttrs: ProductAttrs): Promise<ProductAttrs|undefined> {
        if(productAttrs === null || productAttrs === undefined) {
            console.error('Invalid new product passed in. Not creating product.');
            return;
        }

        const currentUser = await this.userUtil.getCurrentUser();

        if(currentUser === undefined) {
            console.error('Current user is undefined. Not creating product.');
            return;
        }

        const { data, status } = await axios.post(`${this.baseProductUrl}/create`, productAttrs);

        const success = status === 201;
        if(!success) {
            console.error(data);
        }

        return data as ProductAttrs;
    }

    async postTest(testAttrs: TestAttrs): Promise<TestAttrs|undefined> {
        if(testAttrs === null || testAttrs === undefined) {
            console.error('Invalid new test passed in. Not creating test.');
            return;
        }

        const { data, status } = await axios.post(`${this.baseTestsUrl}/create`, {
            testAttrs
        });

        const success = status === 201;
        if(!success) {
            console.error(data);
            return;
        }

        return data as TestAttrs;
    }

    async deleteTest(testId: string): Promise<string|undefined> {
        const { data, status } = await axios.delete(`${this.baseTestsUrl}/${testId}/delete`);

        const success = status === 204;
        if(!success) {
            console.error(data);
            return;
        }

        return data;
    }

    async deleteProduct(productId: string): Promise<TestAttrs|undefined> {
        const { data, status } = await axios.delete(`${this.baseProductUrl}/${productId}/delete`);

        const success = status === 204;
        if(!success) {
            console.error(data);
            return;
        }

        return data;
    }

    async getAllProducts(): Promise<ProductAttrs[]> {
        const { data, status } = await axios.get(this.baseProductUrl);

        const success = status === 200;
        if(!success) {
            console.error(data);
            return [];
        }
        else {
            return data as ProductAttrs[];
        }
    }

    async getProduct(productId: string): Promise<ProductAttrs | undefined> {
        const { data, status } = await axios.get(`${this.baseProductUrl}/${productId}`);

        const success = status === 200;
        if(!success) {
            console.error(data);
            return;
        }
        else {
            return data as ProductAttrs;
        }
    }

    async getTest(testId: string): Promise<TestAttrs | undefined> {
        const { data, status } = await axios.get(`${this.baseTestsUrl}/${testId}`);

        const success = status === 200;
        if(!success) {
            console.error(data);
            return;
        }
        else {
            return data as TestAttrs;
        }
    }

    async getAllTests(): Promise<TestAttrs[]> {
        const { data, status } = await axios.get(`${this.baseTestsUrl}`);

        const success = status === 200;
        if(!success) {
            console.error(data);
            return [];
        }
        else {
            return data as TestAttrs[];
        }
    }
}