const { BinarySearchTree } = require("./binaryTree");

describe("Binary Search Tree", function () {
  let bst;
  beforeEach(function () {
    bst = new BinarySearchTree();
    bst.insert(15);
    bst.insert(20);
    bst.insert(10);
    bst.insert(1);
    bst.insert(12);
    bst.insert(50);
    bst.insert(5);
    bst.insert(11);
  });

  test("find() returns a node that has the inputted value", function () {
    let findNode = bst.find(12);
    expect(findNode).toBeDefined();
    expect(findNode.val).toEqual(12);
  });

  test("find() fails to find nonexistent node", function () {
    expect(bst.find(13)).toBeUndefined();
  });

  test("insert() creates a new node with the inputted value at the correct place", function () {
    expect(bst.find(13)).toBeUndefined();

    bst.insert(13);

    expect(bst.find(13)).toBeDefined();
    expect(bst.find(13).val).toEqual(13);

    expect(bst.findParent(13).val).toEqual(12);
    expect(bst.findParent(13).right.val).toEqual(13);
  });

  test("insert() fails to insert already existing node", function () {
    expect(bst.find(12)).toBeDefined();
    expect(() => bst.insert(12)).toThrow(
      "Value is already in Binary Search Tree"
    );
  });

  test("remove(): removes node w/o children", function () {
    let n = bst.find(50);
    expect(n).toBeDefined();
    expect(n.left).toBeNull();
    expect(n.right).toBeNull();

    let nParent = bst.findParent(50);
    expect(nParent.val).toEqual(20);
    expect(nParent.right.val).toEqual(50);
    expect(nParent.left).toBeNull();

    bst.remove(50);
    expect(nParent.right).toBeNull();
    expect(nParent.left).toBeNull();
  });

  test("remove(): removes node w/ 1 child and gives that child to its parent node", function () {
    let n = bst.find(12);
    let right = n.right;
    expect(n).toBeDefined();
    expect(n.left.val).toBe(11);
    expect(right).toBeNull();

    let nParent = bst.findParent(12);
    expect(nParent.val).toEqual(10);
    expect(nParent.right).toEqual(n);

    bst.remove(12);
    expect(nParent.right.val).toEqual(11);
    expect(nParent.right.right).toEqual(right);
  });

  test("remove(): removes node w/ 2 children replaces the removed node with the node with the next largest value in the tree and the replacement node replaces its children", function () {
    let n = bst.find(10);
    expect(n).toBeDefined();
    expect(n.val).toEqual(10);
    expect(n.left.val).toEqual(1);
    expect(n.right.val).toEqual(12);

    let nParent = bst.findParent(10);
    expect(nParent.val).toEqual(15);
    expect(nParent.left).toEqual(n);

    bst.remove(10);
    expect(nParent.left.val).toEqual(11);
    expect(nParent.left.left.val).toEqual(1);
    expect(nParent.left.right.val).toEqual(12);
  });

  test("remove(): removes root node", function () {
    let n = bst.root;
    expect(n.val).toEqual(15);
    expect(n.left.val).toEqual(10);
    expect(n.right.val).toEqual(20);

    bst.remove(15);
    let n2 = bst.root;
    expect(n2.val).toEqual(20);
    expect(n2.left.val).toEqual(10);
    expect(n2.right.val).toEqual(50);
  });

  test("remove(): fails to remove nonexistent node", function () {
    expect(bst.find(13)).toBeUndefined();
    expect(() => bst.remove(13)).toThrow("node with value 13 does not exist");
  });

  test("dfsPreOrder() returns an array searched with depth-first search pre-order", function () {
    expect(bst.dfsPreOrder()).toEqual([15, 10, 1, 5, 12, 11, 20, 50]);

    bst.insert(17);
    expect(bst.dfsPreOrder()).toEqual([15, 10, 1, 5, 12, 11, 20, 17, 50]);

    bst.remove(10);
    expect(bst.dfsPreOrder()).toEqual([15, 11, 1, 5, 12, 20, 17, 50]);
  });

  test("dfsInOrder() returns an array searched with depth-first search in-order", function () {
    expect(bst.dfsInOrder()).toEqual([1, 5, 10, 11, 12, 15, 20, 50]);

    bst.insert(17);
    expect(bst.dfsInOrder()).toEqual([1, 5, 10, 11, 12, 15, 17, 20, 50]);

    bst.remove(10);
    expect(bst.dfsInOrder()).toEqual([1, 5, 11, 12, 15, 17, 20, 50]);
  });

  test("dfsPostOrder() returns an array searched with depth-first search post-order", function () {
    expect(bst.dfsPostOrder()).toEqual([5, 1, 11, 12, 10, 50, 20, 15]);

    bst.insert(17);
    expect(bst.dfsPostOrder()).toEqual([5, 1, 11, 12, 10, 17, 50, 20, 15]);

    bst.remove(10);
    expect(bst.dfsPostOrder()).toEqual([5, 1, 12, 11, 17, 50, 20, 15]);
  });

  test("bfs() returns an array searched with breadth-first search", function () {
    expect(bst.bfs()).toEqual([15, 10, 20, 1, 12, 50, 5, 11]);

    bst.insert(17);

    expect(bst.bfs()).toEqual([15, 10, 20, 1, 12, 17, 50, 5, 11]);

    bst.remove(10);
    expect(bst.bfs()).toEqual([15, 11, 20, 1, 12, 17, 50, 5]);
  });

  test("minDepth() returns the minimum depth of the tree", function () {
    expect(bst.minDepth()).toEqual(3);

    bst.remove(50);
    expect(bst.minDepth()).toEqual(2);

    bst.insert(50);
    bst.insert(45);
    expect(bst.minDepth()).toEqual(4);
  });

  test("maxDepth() returns the maximum depth of the tree", function () {
    expect(bst.maxDepth()).toEqual(4);

    bst.remove(5);
    bst.remove(11);
    expect(bst.maxDepth()).toEqual(3);

    bst.insert(4);
    bst.insert(9);
    expect(bst.maxDepth()).toEqual(5);
  });
});
