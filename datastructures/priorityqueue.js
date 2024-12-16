export class PriorityQueue {
  head = null;
  tail = null;
  count = 0;

  enqueue(data, priority) {
    const newNode = new Node(data, priority, null);
    // Tjek om køen er tom, eller om den nye node har højere prioritet end hovedet
    if (this.head === null || this.head.priority > priority) {
      newNode.next = this.head;
      this.head = newNode;
      if (this.tail === null) { // Hvis køen er tom, så er halen også hovedet
        this.tail = newNode;
      }
    } else { // Hvis ikke, så indsæt noden i den rigtige rækkefølge. Hvis den nye node har højere prioritet end hovedet, så indsæt noden forrest i køen
      let current = this.head;
      while (current.next != null && current.next.priority <= priority) { // Find den rigtige placering i køen
        current = current.next;
      }
      newNode.next = current.next;
      current.next = newNode;
      if (newNode.next === null) { // Hvis den nye node er den sidste i køen, så opdater halen
        this.tail = newNode;
      }
    }
    this.count++;
  }

  dequeue() {
    if (this.head === null) {
      return null;
    }
    const currentHead = this.head.data;
    this.head = this.head.next;
    if (this.head === null) {
      this.tail = null;
    }
    this.count--;
    return currentHead;
  }

  peek() {
    return this.head ? this.head.data : null;
  }

  size() {
    return this.count;
  }

  get(index) {
    if (index < 0 || index >= this.count) {
      return null;
    }
    let lookAt = this.head; // Start fra hovedet
    let i = 0;
    while (lookAt != null) { // Gå igennem køen indtil vi finder den rigtige node
      if (i === index) { // Hvis vi har fundet den rigtige node, så return dataen
        return lookAt.data;
      }
      lookAt = lookAt.next;
      i++;
    }
    return null;
  }

  contains(data) { // Tjek om data er i køen, altså om data.row og data.col er i køen
    let current = this.head;
    while (current != null) {
      if (current.data.row === data.row && current.data.col === data.col) {
        return true;
      }
      current = current.next;
    }
    return false;
  }

  toArray() { // Returner en array med alle elementer i køen
    const array = [];
    let current = this.head;
    while (current != null) {
      array.push(current.data);
      current = current.next;
    }
    return array;
  }
}

class Node {
  next = null;
  data = null;
  priority = null;

  constructor(data, priority, next = null) {
    this.data = data;
    this.priority = priority;
    this.next = next;
  }
}
