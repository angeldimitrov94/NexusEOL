type TestActionCallback = () => { success: boolean, msg: string };

export class TestAction {
    name: string = "";
    message: string = "";
    callback!: TestActionCallback;
}