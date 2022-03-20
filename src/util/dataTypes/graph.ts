interface GraphObject {
    hash: Graph,
    verticies: () => string[],
    addNode: (value: number) => void,
    addEdge: (node: number, value: number, weight?: number) => void,
    removeNode: (node: number) => void,
    removeEdge: (node: number, value: number) => void
}

interface Graph {
    [key: string]: GraphNode
}

interface GraphNode {
    from: GraphNeighbours,
    to: GraphNeighbours,
    getNodesTo: () => string[],
    getNodesFrom: () => string[]
}

interface GraphNeighbours {
    [key: string]: {
        weight: number
    }
}

const createGraph = () => {
    const hash: Graph = {};

    return {
        hash,
        verticies: () => Object.keys(hash),
        addNode: (value: number) => {
            if (hash[value]) {
                throw Error(`${value} already exists`);
            }

            const node: GraphNode = {
                from: {
                },
                to: {
                },
                getNodesTo: () => Object.keys(node.to),
                getNodesFrom: () => Object.keys(node.from)
            };

            hash[value] = node;
        },
        addEdge: (node: number, value: number, weight: number = 0) => {
            if (!hash[node]) {
                throw Error(`Node ${node} does not exist`);
            }
            if (!hash[value]) {
                throw Error(`Cannot go to Node ${node}. Does not exist`);
            }

            hash[value].from[node] = {
                weight
            };
            hash[node].to[value] = {
                weight
            };
        },
        removeNode: (node: number) => {
            if (!hash[node]) {
                throw Error(`Node ${node} does not exist`);
            }

            const from = hash[node].getNodesFrom();
            const to = hash[node].getNodesTo();
            from.forEach((x) => {
                delete hash[x].to[node];
            });
            to.forEach((x) => {
                delete hash[x].from[node];
            });
            delete hash[node];
        },
        removeEdge: (node: number, value: number) => {
            if (!hash[node]) {
                return;
            }
            delete hash[node].to[value];
        }
    };
};

export type { GraphObject };
export default createGraph;
