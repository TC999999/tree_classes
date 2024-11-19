const { Tree, Node } = require("./tree");

describe("Ordinary Tree", function () {
  let t;
  let r;
  beforeEach(function () {
    r = new Node(3);
    t = new Tree(r);
    t.addChild(3, 5);
    t.addChild(3, 1);
    t.addChild(5, 6);
    t.addChild(5, 2);
    t.addChild(2, 7);
    t.addChild(2, 4);
    t.addChild(1, 0);
    t.addChild(1, 8);
  });

  test("dfs", function () {
    let dfs = t.DFS(4);

    expect(dfs).toBeDefined();
    expect(dfs.val).toEqual(4);
  });

  test("dfs fails for nonexistent nodes", function () {
    expect(t.DFS(10)).toBeUndefined();
  });

  test("bfs", function () {
    let bfs = t.BFS(4);
    expect(bfs).toBeDefined();
    expect(bfs.val).toEqual(4);
  });

  test("bfs fails for nonexistent nodes", function () {
    expect(t.BFS(10)).toBeUndefined();
  });

  test("addChild", function () {
    let branchNode = t.DFS(5);
    expect(branchNode.children.length).toEqual(2);
    expect(branchNode.children[branchNode.children.length - 1].val).toEqual(2);

    t.addChild(5, 10);
    expect(branchNode.children.length).toEqual(3);
    expect(branchNode.children[branchNode.children.length - 1].val).toEqual(10);
  });

  test("sumValues", function () {
    expect(t.sumValues()).toEqual(36);

    t.addChild(3, 10);
    expect(t.sumValues()).toEqual(46);
  });

  test("countEvens", function () {
    expect(t.countEvens()).toEqual(5);

    t.addChild(3, 12);
    expect(t.countEvens()).toEqual(6);

    t.addChild(3, 11);
    expect(t.countEvens()).toEqual(6);
  });

  test("numGreater", function () {
    expect(t.numGreater(7)).toEqual(1);

    expect(t.numGreater(4)).toEqual(4);
  });
});
