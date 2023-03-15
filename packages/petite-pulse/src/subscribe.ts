type Subscriber = (message: any) => void;

class StateControll {
  private subscribers: Record<string | symbol, Subscriber> = {};

  public publish(message: any): void {
    for (const subscriber of Object.values(this.subscribers)) {
      subscriber(message);
    }
  }

  public subscribe(subscriber: Subscriber): symbol | void {
    if (this.checkIfSubscriberExists(subscriber)) {
      console.warn("Subscriber already exists, cannot subscribe again.");
      return;
    }
    const id = Symbol();
    this.subscribers[id] = subscriber;
    return id;
  }

  public unsubscribe(id: symbol): void {
    delete this.subscribers[id];
  }

  private checkIfSubscriberExists(subscriber: Subscriber): boolean {
    for (const id of Object.keys(this.subscribers)) {
      if (this.subscribers[id] === subscriber) {
        return true;
      }
    }
    return false;
  }
}

// 示例用法
const pubsub = new StateControll();

const callback1: Subscriber = (message) => {
  console.log(`Received message: ${message}`);
};

const id1 = pubsub.subscribe(callback1);

const callback2: Subscriber = (message) => {
  console.log(`Received message (from another subscriber): ${message}`);
};

const id2 = pubsub.subscribe(callback2);

pubsub.publish("Hello, world!");

pubsub.subscribe(callback1); // 订阅同一个回调函数
pubsub.publish("Hello again!"); // 输出警告信息

if (id1) {
  pubsub.unsubscribe(id1);
}

pubsub.publish("Goodbye!");
