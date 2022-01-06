// An implementation of the BST data structure

// 1- First a Node class
// 2- Using it to build the data structre since a
//    BST is a node-based DS

class Node {
  constructor(value) {
    this.value = value;
    this.parent = null;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor(root) {
    this.root = new Node(root);
  }

  insert(value) {
    this.insertNode(value, this.root);
  }

  remove(value) {
    this.root = this.removeNode(this.root, value);
  }

  insertNode(value, localRoot) {
    // Creating a new node
    const node = new Node(value);
    if (node.value === localRoot.value) {
      return; // Avoiding duplicates
    } else if (node.value < localRoot.value) {
      // Recursively execute this func until we get to the tail
      // when get there, insert it in the left place under the
      // condition that the value inserted is less than the
      // current root's
      if (localRoot.left != null) {
        this.insertNode(value, localRoot.left);
      } else {
        localRoot.left = node;
        node.parent = localRoot;
      }
    } else {
      // Recursively execute this func until we get to the tail
      // when get there insert it in the right place under the
      // condition that the value is greater than the current root's
      if (localRoot.right != null) {
        this.insertNode(value, localRoot.right);
      } else {
        localRoot.right = node;
        node.parent = localRoot;
      }
    }
  }

  removeNode(node, key) {
      if(node === null) {
          // Avoid the trivial case of adding nothing to the tree
          return null;
      } else if (key < node.value) {
          // Starting from the node, recursively go down the tree
          // to the left if the node's value is greater than the key
          // updating the left child node.
          node.left = this.removeNode(node.left, key);
          return node;
      } else if (key > node.value) {
          // Starting from the given node, recursively go down the tree
          // to the right if the key is greater than the node's value
          // updating the right child node.
          node.right = this.removeNode(node.right, key);
          return node;
      } else {
          // Got the point where the are equal
          // There are three cases to care about 
          //    1- When the node is tail (no children)
          //    2- when the node has one child 
          //    3- When the node has two children

          // The first case : Node is tail
          if (node.left === null && node.right === null) {
              node = null;
              return node;
          }

          // The second case : Node has one child which can be 
          // at left or at right
          if (node.left === null) {
              node = node.right;
              return node;
          } else if (node.right === null) {
              node = node.left;
              return node
          }

          // The third case : Node has two children
          let minValue = this._minValue(node.right);
          node.value = minValue.value;
          node.right = this.removeNode(node.right, minValue);
          return node;
      }
  }

  _minValue(node) {
      if(node.left === null) {
          // If we get to a point where the node is the least value
          // of the branch since the node.right is by definition
          // greater than the node itself 
          return node;
      } else {
          return this._minValue(node.left); // the right is already >
      };

  }
}

export default BinarySearchTree;
