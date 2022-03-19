interface QNode {
    previous: QNode | null
    next: QNode | null
    value: any
}

interface Ends {
    node: QNode | null
}

interface Dequeue {
    length: Function,
    popLeft: Function,
    popRight: Function,
    push: Function,
    head: Function
}

const createDequeue = (): Dequeue => {
    const head: Ends = {
        node: null
    };

    const tail: Ends = {
        node: null
    };

    let length = 0;

    return {
        length: (): Number => length,
        popLeft: (): any => {
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
        popRight: (): any => {
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
        push: (value: any) => {
            const previous = tail.node;
            const node: QNode = {
                value,
                next: null,
                previous
            };

            // queue is empty
            if (length === 0) {
                head.node = node;
            } else {
                if (!previous) {
                    throw Error('previous node not defined when it should be');
                }
                previous.next = node;
            }

            tail.node = node;
            length += 1;
        },
        head: (): Ends => head
    };
};

export type { Ends, QNode };
export {
    // eslint-disable-next-line import/prefer-default-export
    createDequeue
};
