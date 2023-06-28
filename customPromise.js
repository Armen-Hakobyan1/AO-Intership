const FULFILLED = 'fulfilled';
const PENDING = 'pending';
const REJECTED = 'rejected';

 class CustomPromise {
  constructor (executor) {
    this.state = PENDING;
    this.result = undefined;
    this.onFulfilledFn = [];
    this.onRejectedFn = [];

    const resolve = value => {
      if (this.state === PENDING) {
        this.state = FULFILLED;
        this.result = value;
        this.onFulfilledFn.forEach((fn) => fn(value))
      }
    };

    const reject = error => {
      if (this.state === PENDING) {
        this.state = REJECTED;
        this.result = error;
        this.onRejectedFn.forEach((fn) => fn(error))
      }
    };
    try {
      executor (resolve, reject);
    } catch (error) {
      reject (error);
    }
  }
  then(onFulfilled, onRejected) {
    if (this.state === PENDING) {
      if (onFulfilled) {
        this.onFulfilledFn.push(onFulfilled);
      }
      if (onRejected) {
        this.onRejectedFn.push(onRejected);
      }
    }
    if (onFulfilled && this.state === FULFILLED) {
      onFulfilled(this.result);
      return;
    }
    if (onRejected && this.state === REJECTED) {
      onRejected(this.result);
      return;
    }
  }
  catch(onRejected) {
    return this.then(null,onRejected)
  }
}

const promise = new CustomPromise((resolve, reject) => {
  setTimeout(() => reject(new Error('error')), 2000);
}).catch((error) => {
  console.log(error);
})