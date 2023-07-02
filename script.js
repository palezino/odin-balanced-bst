class Node {
    constructor(data, left=null, right=null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class Tree {
    constructor(arr) {
        this.root = this.buildTree(arr);
    }
    buildTree(arr) {
        // console.log(arr)
        if (arr.length === 0) {
            return null;
        } else {
            arr.sort((a,b) => a - b);
            arr = [...new Set(arr)];
            // console.log(arr);
       
            let mid = Math.floor(arr.length / 2);
            let leftArr = arr.slice(0, mid);
            let rightArr = arr.slice(mid + 1);
            let node = new Node(arr[mid], this.buildTree(leftArr), this.buildTree(rightArr));
            return node;
        }
    }
    insert(data) {
        let node = this.root;
        if (node === null) {
            return node = new Node(data);
        }
        while(node !== null) {
            if(node.data < data) {
                if(node.right === null) {
                    return node.right = new Node(data);
                } else {
                    node = node.right;
                }
                // node.right === null ? node.right = new Node(data) : node = node.right;
            } else {
                if(node.left === null) {
                    return node.left = new Node(data);
                } else {
                    node = node.left;
                }
                // node.left === null ? node.left = new Node(data) : node = node.left;
            }
        }
        // node = new Node(data);
        // console.log(node)
        // return;
    }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

let array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

let newTree = new Tree(array);
newTree.insert(322);

prettyPrint(newTree.root);
console.log(newTree.root);