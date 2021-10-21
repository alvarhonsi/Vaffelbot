// A queue is just a basic array with push() and shift() as enqueue() and dequeue() respectively
class Queue extends Array {
    enqueue = this.push;
    dequeue = this.shift;
    size() { return this.length; }
}

module.exports = Queue;