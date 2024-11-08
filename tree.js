class Node {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }

  dfs(val) {
    let dfsStack = [this];

    while (dfsStack.length) {
      let current = dfsStack.pop();
      console.log(current);

      if (current.val === val) {
        return true;
      }
      for (let child of current.children) {
        dfsStack.push(child);
      }
    }
    return false;
  }

  bfs(val) {
    let bfsQueue = [this];

    while (bfsQueue.length) {
      let current = bfsQueue.shift();
      console.log(current);

      if (current.val === val) {
        return true;
      }
      for (let child of current.children) {
        bfsQueue.push(child);
      }
    }

    return false;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  DFS(val) {
    return this.root.dfs(val);
  }

  BFS(val) {
    return this.root.bfs(val);
  }

  addChild(branch, leaf) {
    let searchQueue = [this.root];
    while (searchQueue.length) {
      let currentNode = searchQueue.shift();
      if (currentNode.val === branch) {
        let newChild = new Node(leaf);
        currentNode.children.push(newChild);
        return "Branch found. Lead added.";
      }
      for (let child of currentNode.children) {
        searchQueue.push(child);
      }
    }

    return "Branch not found.";
  }

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
