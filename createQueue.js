const createQueue = () => {
    const head = {
        node: null
    };

    const tail = {
        node: null
    };

    let length = 0;

    return {
        length: () => length,
        pop: () => {
            // front
            if (head.node === null) {
                throw Error('Queue is empty');
            }

            const node = head.node;

            head.node = node.next;
            if (node.next !== null) {
                node.next.previous = null;
            }

            length -= 1;
            return node.value;
        },
        popLast: () => {
            // end of the queue
            if (tail.node === null) {
                throw Error('Queue is empty');
            }

            const node = tail.node;
            const previous = node.previous;
            if (previous !== null) {
                previous.next = null;
            }
            tail.node = previous;

            length -= 1;
            return node.value;
        },
        push: (value) => {
            const previous = tail.node;
            const node = {
                value,
                next: null,
                previous
            };

            // queue is empty
            if (length === 0) {
                head.node = node;
            } else {
                previous.next = node;
            }

            tail.node = node;
            length += 1;
        }
    };
};
