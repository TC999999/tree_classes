class Node {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }

  dfs(val) {
    let dfsStack = [this];

    while (dfsStack.length) {
      let current = dfsStack.pop();

      if (current.val === val) {
        return current;
      }
      for (let child of current.children) {
        dfsStack.push(child);
      }
    }
    return undefined;
  }

  bfs(val) {
    let bfsQueue = [this];

    while (bfsQueue.length) {
      let current = bfsQueue.shift();

      if (current.val === val) {
        return current;
      }
      for (let child of current.children) {
        bfsQueue.push(child);
      }
    }

    return undefined;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  // Searches for a value using depth first search
  DFS(val) {
    return this.root.dfs(val);
  }

  // Searches for a value using breadth first search
  BFS(val) {
    return this.root.bfs(val);
  }

  // adds a child node with the inputted leaf value to a branch node with the inputted branch value
  addChild(branch, leaf) {
    let searchQueue = [this.root];
    while (searchQueue.length) {
      let currentNode = searchQueue.shift();
      if (currentNode.val === branch) {
        let newChild = new Node(leaf);
        currentNode.children.push(newChild);
        return;
      }
      for (let child of currentNode.children) {
        searchQueue.push(child);
      }
    }

    throw new Error("branch value not found");
  }

  //returns the sum of all values of the tree together if all the values are numbers
  sumValues() {
    let total = 0;
    let numQueue = [this.root];
    while (numQueue.length) {
      let currentNode = numQueue.shift();
      total += currentNode.val;
      for (let child of currentNode.children) {
        numQueue.push(child);
      }
    }
    return total;
  }

  // returns the number of even numbers on the tree
  countEvens() {
    let total = 0;
    let numQueue = [this.root];
    while (numQueue.length) {
      let currentNode = numQueue.shift();
      if (currentNode.val % 2 === 0) {
        total++;
      }
      for (let child of currentNode.children) {
        numQueue.push(child);
      }
    }
    return total;
  }

  // returns the number of values greater than the inputted value
  numGreater(val) {
    let total = 0;
    let numQueue = [this.root];
    while (numQueue.length) {
      let currentNode = numQueue.shift();
      if (currentNode.val > val) {
        total++;
      }
      for (let child of currentNode.children) {
        numQueue.push(child);
      }
    }
    return total;
  }
}

module.exports = { Tree, Node };
