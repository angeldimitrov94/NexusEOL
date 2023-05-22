export class EventBus {
    events = new Map<string, Function[]>();

    $on(eventName: string, fn: Function) {
        if(!this.events.has(eventName)) {
            this.events.set(eventName, []);
        }

        this.events.get(eventName)?.push(fn);
    }

    $emit(eventName: string, data: Object) {
        if(this.events.has(eventName)) {
            this.events.get(eventName)?.forEach(fn => fn(data));
        }
    } 
}