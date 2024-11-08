class BSTNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  //Inserts a value into the BST based on the current values and their positions
  insert(val) {
    if (!this.root) {
      let newRoot = new BSTNode(val);
      this.root = newRoot;
    } else {
      let currentNode = this.root;
      while (currentNode) {
        if (currentNode.val > val) {
          if (!currentNode.left) {
            currentNode.left = new BSTNode(val);
            break;
          } else {
            currentNode = currentNode.left;
          }
        } else if (currentNode.val < val) {
          if (!currentNode.right) {
            currentNode.right = new BSTNode(val);
            break;
          } else {
            currentNode = currentNode.right;
          }
        } else {
          throw new Error("Value is already in Binary Search Tree");
        }
      }
    }
  }

  //Inserts a value into the BST based on the current values and their positions, but uses recursion
  insertRecursively(val, currentNode = this.root) {
    if (!this.root) {
      this.root = new BSTNode(val);
    } else {
      if (currentNode.val > val) {
        if (currentNode.left) {
          this.insertRecursively(val, currentNode.left);
        } else {
          currentNode.left = new BSTNode(val);
        }
      } else if (currentNode.val < val) {
        if (currentNode.right) {
          this.insertRecursively(val, currentNode.right);
        } else {
          currentNode.right = new BSTNode(val);
        }
      } else {
        throw new Error("Value is already in Binary Search Tree");
      }
    }
  }

  //Removes a node in the tree if the inputted value exists in the tree. Handles instances where the the removed node is the root of the tree, has no child nodes, has one child node, and has two child nodes.
  remove(val) {
    let removedNode = this.find(val);
    if (removedNode) {
      if (!removedNode.left && !removedNode.right) {
        let parentNode = this.findParent(val);
        if (parentNode) {
          if (parentNode.left && parentNode.left.val === removedNode.val) {
            parentNode.left = null;
          } else if (
            parentNode.right &&
            parentNode.right.val === removedNode.val
          ) {
            parentNode.right = null;
          }
        } else {
          this.root = null;
        }
      } else if (
        (!removedNode.left && removedNode.right) ||
        (removedNode.left && !removedNode.right)
      ) {
        let parentNode = this.findParent(val);
        if (parentNode) {
          if (removedNode.left && !removedNode.right) {
            if (parentNode.right && parentNode.right.val === val) {
              parentNode.right = removedNode.left;
              removedNode.left.right = removedNode.right;
            } else if (parentNode.left && parentNode.left.val === val) {
              parentNode.left = removedNode.left;
            }
          } else if (!removedNode.left && removedNode.right) {
            if (parentNode.left && parentNode.left.val === val) {
              parentNode.left = removedNode.right;
              removedNode.right.left = removedNode.left;
            } else if (parentNode.right && parentNode.right.val === val) {
              parentNode.right = removedNode.right;
            }
          }
        } else {
          if (removedNode.left && !removedNode.right) {
            this.root = removedNode.left;
          } else if (!removedNode.left && removedNode.right) {
            this.root = removedNode.right;
          }
        }
      } else if (removedNode.right && removedNode.left) {
        let parentNode = this.findParent(val);
        if (parentNode) {
          let nextLargest = this.nextLarger(val);
          let nextLargestParent = this.findParent(nextLargest.val);
          if (parentNode.left && parentNode.left.val === val) {
            parentNode.left = nextLargest;
          } else if (parentNode.right && parentNode.right.val === val) {
            parentNode.right = nextLargest;
          }
          if (nextLargest.right && nextLargestParent.val !== val) {
            nextLargestParent.left = nextLargest.right;
            nextLargest.right.left = nextLargest.left;
            nextLargest.right = removedNode.right;
          } else if (!nextLargest.right && nextLargestParent.val !== val) {
            nextLargestParent.left = nextLargest.right;
            nextLargest.right = removedNode.right;
          }
          nextLargest.left = removedNode.left;
        } else {
          let nextLargest = this.nextLarger(val);
          let nextLargestParent = this.findParent(nextLargest.val);
          if (nextLargest.right && nextLargestParent.val !== val) {
            nextLargestParent.left = nextLargest.right;
            nextLargest.right.left = nextLargest.left;
            nextLargest.right = removedNode.right;
          } else if (!nextLargest.right && nextLargestParent.val !== val) {
            nextLargestParent.left = nextLargest.right;
            nextLargest.right = removedNode.right;
          }
          nextLargest.left = removedNode.left;
          this.root = nextLargest;
        }
      }
    } else {
      return "node does not exist";
    }
  }

  // uses a depth first search method to find if a value is in the tree
  find(val) {
    let dfsStack = [this.root];
    while (dfsStack.length) {
      let currentNode = dfsStack.pop();
      if (currentNode.val === val) {
        return currentNode;
      } else if (currentNode.val > val && currentNode.left) {
        dfsStack.push(currentNode.left);
      } else if (currentNode.val < val && currentNode.right) {
        dfsStack.push(currentNode.right);
      }
    }
    return undefined;
  }

  //Uses depth first search to find the parent node of a node with an inputted value
  findParent(val) {
    let dfsStack = [this.root];
    while (dfsStack.length) {
      let currentNode = dfsStack.pop();
      //   console.log(currentNode);
      if (
        (currentNode.right && currentNode.right.val === val) ||
        (currentNode.left && currentNode.left.val === val)
      ) {
        return currentNode;
      } else if (currentNode.val > val && currentNode.left) {
        dfsStack.push(currentNode.left);
      } else if (currentNode.val < val && currentNode.right) {
        dfsStack.push(currentNode.right);
      }
    }
    return undefined;
  }

  // uses a depth first search method to find if a value is in the tree, but uses recursion
  findRecursively(val, currentNode = this.root) {
    if (currentNode.val === val) {
      return currentNode;
    } else if (currentNode.val > val && currentNode.left) {
      return this.findRecursively(val, currentNode.left);
    } else if (currentNode.val < val && currentNode.right) {
      return this.findRecursively(val, currentNode.right);
    }
    return undefined;
  }

  // pushes the values of the tree into the array using the depth-first search pre-order method
  dfsPreOrder(arr = [], currentNode = this.root) {
    arr.push(currentNode.val);
    if (currentNode.left) {
      arr = this.dfsPreOrder(arr, currentNode.left);
    }
    if (currentNode.right) {
      arr = this.dfsPreOrder(arr, currentNode.right);
    }
    return arr;
  }

  // pushes the values of the tree into the array using the depth-first search in-order method
  dfsInOrder(arr = [], currentNode = this.root) {
    if (currentNode.left) {
      arr = this.dfsInOrder(arr, currentNode.left);
    }
    arr.push(currentNode.val);
    if (currentNode.right) {
      arr = this.dfsInOrder(arr, currentNode.right);
    }
    return arr;
  }

  // pushes the values of the tree into the array using the depth-first search post-order method
  dfsPostOrder(arr = [], currentNode = this.root) {
    if (currentNode.left) {
      arr = this.dfsPostOrder(arr, currentNode.left);
    }
    if (currentNode.right) {
      arr = this.dfsPostOrder(arr, currentNode.right);
    }
    arr.push(currentNode.val);
    return arr;
  }

  // pushes the values of the tree into the array using the breadth-first search  method
  bfs() {
    let q = [this.root];
    let arr = [];
    while (q.length) {
      let currentNode = q.shift();
      arr.push(currentNode.val);
      if (currentNode.left) {
        q.push(currentNode.left);
      }
      if (currentNode.right) {
        q.push(currentNode.right);
      }
    }
    return arr;
  }

  //Finds the minimum depth of the binary search tree, or the amount of nodes from the root to the first leaf on the tree
  minDepth() {
    let levelQueue = [this.root];
    let minDepth = 1;
    while (levelQueue.length) {
      let nextLevelQueue = [];
      for (let node of levelQueue) {
        if (!node.right && !node.left) {
          return minDepth;
        } else {
          if (node.left) {
            nextLevelQueue.push(node.left);
          }
          if (node.right) {
            nextLevelQueue.push(node.right);
          }
        }
      }

      levelQueue = nextLevelQueue;
      minDepth++;
    }
  }

  //Finds the maximum depth of the binary search tree, or the amount of nodes from the root to the lowest leaf on the tree
  maxDepth() {
    let levelQueue = [this.root];
    let maxDepth = 1;
    while (levelQueue.length) {
      let nextLevelQueue = [];
      for (let node of levelQueue) {
        if (node.left) {
          nextLevelQueue.push(node.left);
        }
        if (node.right) {
          nextLevelQueue.push(node.right);
        }
      }
      if (!nextLevelQueue.length) {
        return maxDepth;
      } else {
        levelQueue = nextLevelQueue;
        maxDepth++;
      }
    }
  }

  // Finds the next largest value in the tree from the input x.
  nextLarger(x) {
    let q = [this.root];
    let nL = null;
    while (q.length) {
      let currentNode = q.shift();
      if (currentNode.val > x && !nL) {
        nL = currentNode;
      } else if (currentNode.val > x && currentNode.val < nL.val) {
        nL = currentNode;
      }
      if (currentNode.left) {
        q.push(currentNode.left);
      }
      if (currentNode.right) {
        q.push(currentNode.right);
      }
    }
    return nL;
  }
}
