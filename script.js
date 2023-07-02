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
            console.log(arr);
       
            let mid = Math.floor(arr.length / 2);
            let leftArr = arr.slice(0, mid);
            let rightArr = arr.slice(mid + 1);
            let node = new Node(arr[mid], this.buildTree(leftArr), this.buildTree(rightArr));
            return node;
        }
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
prettyPrint(newTree.root);
console.log(newTree.root);