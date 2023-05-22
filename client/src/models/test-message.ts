import { TestMessageLevel } from "./test-message-level";

export class TestMessage {
    dateTime: string = "";
    text: string = "";
    level: TestMessageLevel = TestMessageLevel.INFO;
}