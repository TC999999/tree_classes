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

  test("find", function () {
    let findNode = bst.find(12);
    expect(findNode).not.toBe(undefined);
  });

  test("fail to find nonexistent node", function () {
    let findNode = bst.find(13);
    expect(findNode).toBe(undefined);
  });

  test("insert", function () {
    let findNode = bst.find(13);
    expect(findNode).toBe(undefined);

    bst.insert(13);
    let findNode2 = bst.find(13);
    expect(findNode2).not.toBe(undefined);
    let parentNode = bst.findParent(13);
    expect(parentNode.val).toEqual(12);
  });

  test("fail to insert already existing node", function () {
    let findNode = bst.find(12);
    expect(findNode).not.toBe(undefined);
    try {
      bst.insert(12);
    } catch (err) {
      expect(err.message).toBe("Value is already in Binary Search Tree");
    }
  });

  test("remove node w/o children", function () {
    let n = bst.find(50);
    expect(n).not.toBe(undefined);
    expect(n.left).toBe(null);
    expect(n.right).toBe(null);

    let nParent = bst.findParent(50);
    expect(nParent.val).toEqual(20);
    expect(nParent.right.val).toEqual(50);
    expect(nParent.left).toBe(null);

    bst.remove(50);
    expect(nParent.right).toBe(null);
    expect(nParent.left).toBe(null);
  });

  test("remove node w/ 1 child", function () {
    let n = bst.find(12);
    let right = n.right;
    expect(n).not.toBe(undefined);
    expect(n.left.val).toBe(11);
    expect(right).toBe(null);

    let nParent = bst.findParent(12);
    expect(nParent.val).toEqual(10);
    expect(nParent.right).toEqual(n);

    bst.remove(12);
    expect(nParent.right.val).toEqual(11);
    expect(nParent.right.right).toEqual(right);
  });

  test("remove node w/ 2 children", function () {
    let n = bst.find(10);
    expect(n).not.toBe(undefined);
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

  test("remove root node", function () {
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

  test("fails to remove nonexistent node", function () {
    let failFind = bst.find(13);
    expect(failFind).toBe(undefined);
    try {
      bst.remove(13);
    } catch (err) {
      expect(err.message).toEqual("node with value 13 does not exist");
    }
  });

  test("dfsPreOrder", function () {
    let preOrder = bst.dfsPreOrder();
    expect(preOrder).toEqual([15, 10, 1, 5, 12, 11, 20, 50]);

    bst.insert(17);
    let preOrder2 = bst.dfsPreOrder();
    expect(preOrder2).toEqual([15, 10, 1, 5, 12, 11, 20, 17, 50]);

    bst.remove(10);
    let preOrder3 = bst.dfsPreOrder();
    expect(preOrder3).toEqual([15, 11, 1, 5, 12, 20, 17, 50]);
  });

  test("dfsInOrder", function () {
    let inOrder = bst.dfsInOrder();
    expect(inOrder).toEqual([1, 5, 10, 11, 12, 15, 20, 50]);

    bst.insert(17);
    let inOrder2 = bst.dfsInOrder();
    expect(inOrder2).toEqual([1, 5, 10, 11, 12, 15, 17, 20, 50]);

    bst.remove(10);
    let inOrder3 = bst.dfsInOrder();
    expect(inOrder3).toEqual([1, 5, 11, 12, 15, 17, 20, 50]);
  });

  test("dfsPostOrder", function () {
    let postOrder = bst.dfsPostOrder();
    expect(postOrder).toEqual([5, 1, 11, 12, 10, 50, 20, 15]);

    bst.insert(17);
    let postOrder2 = bst.dfsPostOrder();
    expect(postOrder2).toEqual([5, 1, 11, 12, 10, 17, 50, 20, 15]);

    bst.remove(10);
    let postOrder3 = bst.dfsPostOrder();
    expect(postOrder3).toEqual([5, 1, 12, 11, 17, 50, 20, 15]);
  });

  test("bfs", function () {
    let bfs = bst.bfs();
    expect(bfs).toEqual([15, 10, 20, 1, 12, 50, 5, 11]);

    bst.insert(17);
    let bfs2 = bst.bfs();
    expect(bfs2).toEqual([15, 10, 20, 1, 12, 17, 50, 5, 11]);

    bst.remove(10);
    let bfs3 = bst.bfs();
    expect(bfs3).toEqual([15, 11, 20, 1, 12, 17, 50, 5]);
  });

  test("minDepth", function () {
    let md1 = bst.minDepth();
    expect(md1).toEqual(3);

    bst.remove(50);

    let md2 = bst.minDepth();
    expect(md2).toEqual(2);

    bst.insert(50);
    bst.insert(45);

    let md3 = bst.minDepth();
    expect(md3).toEqual(4);
  });

  test("maxDepth", function () {
    let md1 = bst.maxDepth();
    expect(md1).toEqual(4);

    bst.remove(5);
    bst.remove(11);

    let md2 = bst.maxDepth();
    expect(md2).toEqual(3);

    bst.insert(4);
    bst.insert(9);
    let md3 = bst.maxDepth();
    expect(md3).toEqual(5);
  });
});
