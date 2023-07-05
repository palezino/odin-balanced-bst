class Node {
  constructor(data, left = null, right = null) {
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
      arr.sort((a, b) => a - b);
      arr = [...new Set(arr)];
      // console.log(arr);

      let mid = Math.floor(arr.length / 2);
      let leftArr = arr.slice(0, mid);
      let rightArr = arr.slice(mid + 1);
      let node = new Node(
        arr[mid],
        this.buildTree(leftArr),
        this.buildTree(rightArr)
      );
      return node;
    }
  }
  insert(data) {
    let node = this.root;
    if (node === null) {
      return (node = new Node(data));
    }
    while (node !== null) {
      if (node.data < data) {
        if (node.right === null) {
          return (node.right = new Node(data));
        } else {
          node = node.right;
        }
      } else {
        if (node.left === null) {
          return (node.left = new Node(data));
        } else {
          node = node.left;
        }
      }
    }
  }
  delete(data, node = this.root) {
    if (node === null) {
      return;
    }
    if (node.data === data) {
      if (node.right === null && node.left === null) {
        return (node.data = null);
      }
      if (node.left === null) {
        return (node.data = node.right);
      }
      if (node.right === null) {
        return (node.data = node.left);
      }
      let newNode = node.right;
      while(newNode.left !== null) {
        newNode = newNode.left;
      }
      node.data = newNode.data;
      node.right = this.delete(newNode.data, node.right);
      return node;
    } else if (data < node.data) {
        node.left = this.delete(data, node.left);
        return node;
    } else {
        node.right = this.delete(data, node.right);
        return node;
    }
  }
  find(value) {
    let node = this.root;
    while(node.data !== value) {
        if (value > node.data) {
            node = node.right;
        } else {
            node = node.left;
        }
        if (node === null) {
            return null;
        }
    }
    return node;
  }
  levelOrder(func) {
    let queue = [this.root];
    let arr = [];
    if (func === undefined) {
        func = (node) => {
            arr.push(node.data);
        }
    }

    while(queue.length !== 0) {
        let node = queue.shift();
        if (node.left !== null) {
            queue.push(node.left);
        }
        if (node.right !== null) {
            queue.push(node.right);
        }
        func(node);
    }
    return arr;
  }
  inorder(func, node=this.root) {
  // left->root->right
    let arr = [];
    if (func === undefined) {
        func = (node) => {
            arr.push(node.data);
        }
    }
    if (node === null) {
      return;
    } else {
      this.preorder(func, node.left);
      func(node);
      this.preorder(func, node.right);
    }
  }
  preorder(func, node=this.root) {
    // root->left->right
    let arr = [];
    if (func === undefined) {
        func = (node) => {
            arr.push(node.data);
        }
    }
    if (node === null) {
      return;
    } else {
      func(node);
      this.preorder(func, node.left);
      this.preorder(func, node.right);
    }
  }
  postorder(func, node = this.root) {
    // left->right->root
    let arr = [];
    if (func === undefined) {
        func = (node) => {
            arr.push(node.data);
        }
    }
    if (node === null) {
      return;
    } else {
      this.preorder(func, node.left);
      this.preorder(func, node.right);
      func(node);
    }
  }
  height(node) {
    if (node === null) {
      return -1;
    } else {
      return Math.max(this.height(node.left) + 1, this.height(node.right) + 1)
    }
  }
  depth(node) {
    if (this.root === null) {
      return;
    }
    let rootNode = this.root;
    let count = 0;
    while(rootNode !== node || rootNode === null) {
      if(node.data < rootNode.data) {
        rootNode = rootNode.left;
        count++;
      } else {
        rootNode = rootNode.right;
        count++;
      }
    }
    return count;
  }
};
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
}

let array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

let newTree = new Tree(array);
newTree.insert(322);
// newTree.height(newTree.root);

prettyPrint(newTree.root);
// console.log(newTree.root.right.right.left)
console.log(newTree.depth(newTree.root.right.right.left));
