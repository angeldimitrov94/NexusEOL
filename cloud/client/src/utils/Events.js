export class EventBus {
    events = new Map();

    $on(eventName, fn) {
        if(!this.events.has(eventName)) {
            this.events.set(eventName, []);
        }

        this.events.get(eventName).push(fn);
    }

    $emit(eventName, data) {
        if(this.events.has(eventName)) {
            this.events.get(eventName).forEach(fn => fn(data));
        }
    } 
}