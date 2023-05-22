import type { TestAction } from "./test-action";
import { TestMessage } from "./test-message";
import { TestState } from "./test-state";

export class Test {
    name: string = "";
    id: string = "";
    description: string = "";
    state: TestState = TestState.NOT_STARTED;
    active: boolean = false;
    messages: TestMessage[] = [];
    actions: TestAction[] = [];
    currentActionIndex: number = this.actions.length == 0 ? -1 : 0;
}