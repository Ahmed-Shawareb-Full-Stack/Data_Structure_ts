import { DoublyLinkedList, ListNode } from './doublylinkedlist';
export class Stack<T> {
  private list: DoublyLinkedList<T> = new DoublyLinkedList();

  constructor(...elements: T[]) {
    for (const element of elements) {
      this.push(element);
    }
  }

  public size() {
    return this.list.listSize();
  }

  public isEmpty() {
    return this.list.listSize() == 0;
  }

  public push(item: T) {
    return this.list.addFirst(item);
  }

  public pop() {
    if (this.isEmpty()) {
      throw new Error('Stack is empty');
    }
    return this.list.removeHead();
  }

  public peek() {
    if (this.isEmpty()) {
      throw new Error('Stack is empty');
    }
    return this.list.getHead();
  }

  public toString() {
    if (this.isEmpty()) {
      return '[]';
    }
    return this.list.toString();
  }

  public [Symbol.iterator](): Iterator<T> {
    return this.list[Symbol.iterator]();
  }
}

const stack = new Stack(1, 2, 3, 4, 5);
console.log(stack);
console.log(stack.size());
stack.push(6);
console.log(stack.size());
console.log(stack.peek());
stack.pop();
console.log(stack.peek());
console.log(stack.peek().next?.next?.next);
