export class ListNode<T> {
  public data: T | null;
  public next: ListNode<T> | null;
  public prev: ListNode<T> | null;

  constructor(data: T, prev: ListNode<T> | null, next: ListNode<T> | null) {
    this.data = data;
    this.prev = prev;
    this.next = next;
  }
  public toString(): string | undefined {
    return this.data?.toString();
  }
}

export class DoublyLinkedList<T> {
  private size: number = 0;
  private head: ListNode<T> | null = null;
  private tail: ListNode<T> | null = null;

  constructor(...elements: T[]) {
    for (const element of elements) {
      this.add(element);
    }
  }

  public clear(): void {
    let trav: ListNode<T> | null = this.head;
    while (trav != null) {
      let next = trav.next;
      trav.prev = trav.next = null;
      trav.data = null;
      trav = next;
    }

    this.head = this.tail = null;
    trav = null;
    this.size = 0;
  }

  public listSize(): number {
    return this.size;
  }

  public isEmpty(): boolean {
    return this.size === 0;
  }

  public add(item: T): DoublyLinkedList<T> {
    return this.addLast(item);
  }
  public addLast(item: T): DoublyLinkedList<T> {
    if (this.isEmpty()) {
      this.head = this.tail = new ListNode<T>(item, null, null);
    } else {
      this.tail!.next = new ListNode<T>(item, this.tail, null);
      this.tail = this.tail!.next;
    }
    this.size++;
    return this;
  }
  public addFirst(item: T): DoublyLinkedList<T> {
    if (this.isEmpty()) {
      this.head = this.tail = new ListNode<T>(item, null, null);
    } else {
      this.head!.prev = new ListNode<T>(item, null, this.head);
      this.head = this.head!.prev;
    }
    this.size++;
    return this;
  }
  public addAt(item: T, index: number): DoublyLinkedList<T> {
    if (index > this.size || index < 0) {
      throw new Error('Illegal Index');
    }
    if (0 === index) {
      this.addFirst(item);
    }
    if (this.size - 1 === index) {
      this.addLast(item);
    }

    let temp: ListNode<T> = this.head!;
    for (let i = 0; (i = index - 1); ) {
      temp = temp.next!;
    }
    const newNode = new ListNode(item, temp, temp.next);
    temp.next!.prev = newNode;
    temp.next = newNode;
    newNode.next!.prev = newNode;
    this.size++;
    return this;
  }

  public getHead(): ListNode<T> {
    if (this.isEmpty()) {
      throw new Error('Empty List');
    }
    return this.head!;
  }

  public getTail(): ListNode<T> {
    if (this.isEmpty()) {
      throw new Error('Empty List');
    }
    return this.tail!;
  }

  public removeHead(): T {
    if (this.isEmpty()) {
      throw new Error('Empty List');
    }

    let deletedHeadData = this.head!.data!;
    this.head = this.head!.next;
    if (this.isEmpty()) {
      this.tail = null;
    } else {
      this.head!.prev = null;
    }

    return deletedHeadData;
  }

  public removeTail(): T {
    if (this.isEmpty()) {
      throw new Error('Empty List');
    }
    let deletedTailData = this.tail!.data!;
    this.tail = this.tail!.prev!;

    if (this.isEmpty()) {
      this.head = null;
    } else {
      this.tail.next = null;
    }

    return deletedTailData;
  }

  public removeAt(index: number): T {
    if (index < 0 || index >= this.size) {
      throw new Error('Illegal Index');
    }

    let i: number;
    let trav: ListNode<T>;

    if (index < this.size / 2) {
      for (i = 0, trav = this.head!; i != index; i++) {
        trav = trav.next!;
      }
    } else {
      for (i = this.size - 1, trav = this.tail!; i != index; i--) {
        trav = trav.prev!;
      }
    }
    return this.remove(trav);
  }

  public delete(obj: ListNode<T>): boolean {
    let trav: ListNode<T>;
    for (trav = this.head!; trav != null; trav = trav.next!) {
      if (
        (obj == null && trav.data == null) ||
        (obj != null && trav.data == obj)
      ) {
        this.remove(trav);
        return true;
      }
    }
    return false;
  }

  public indexOf(obj: ListNode<T>): number {
    let trav: ListNode<T>;
    let index: number = 0;
    for (trav = this.head!; trav != null; trav = trav.next!, index++) {
      if (
        (obj == null && trav.data == null) ||
        (obj != null && trav.data == obj)
      ) {
        return index;
      }
    }
    return -1;
  }

  public contains(obj: ListNode<T>): boolean {
    return this.indexOf(obj) !== -1;
  }

  public [Symbol.iterator](): Iterator<T> {
    let trav = this.head;
    return {
      next(): IteratorResult<T> {
        if (trav === null) {
          return { done: true, value: null! };
        } else {
          let value = trav.data;
          trav = trav.next;
          return { done: false, value: value } as any;
        }
      },
    };
  }

  public toString(): string {
    let sb = '[ ';
    let trav = this.head;
    while (trav != null) {
      sb += trav.data;
      if (trav.next != null) {
        sb += ', ';
      }
      trav = trav.next;
    }
    sb += ' ]';
    return sb;
  }

  private remove(node: ListNode<T> | null): T {
    if (node!.prev == null) return this.removeHead();
    if (node!.next == null) return this.removeTail();

    let nodeData = node!.data;
    node!.prev.next = node!.next;
    node!.next.prev = node!.prev;
    node!.data = null;
    node = node!.next = node!.prev = null;

    this.size--;

    return nodeData!;
  }
}
