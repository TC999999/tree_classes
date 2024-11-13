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
    expect(dfs).not.toBe(undefined);
  });

  test("dfs fails for nonexistent nodes", function () {
    let dfs = t.DFS(10);
    expect(dfs).toBe(undefined);
  });

  test("bfs", function () {
    let bfs = t.BFS(4);
    expect(bfs).not.toBe(undefined);
  });

  test("bfs", function () {
    let bfs = t.BFS(10);
    expect(bfs).toBe(undefined);
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
    let sum = t.sumValues();
    expect(sum).toEqual(36);

    t.addChild(3, 10);
    let sum2 = t.sumValues();
    expect(sum2).toEqual(46);
  });

  test("countEvens", function () {
    let evens = t.countEvens();
    expect(evens).toEqual(5);

    t.addChild(3, 12);
    let evens2 = t.countEvens();
    expect(evens2).toEqual(6);

    t.addChild(3, 11);
    let evens3 = t.countEvens();
    expect(evens3).toEqual(6);
  });

  test("numGreater", function () {
    let numGreater = t.numGreater(7);
    expect(numGreater).toEqual(1);

    let numGreater2 = t.numGreater(4);
    expect(numGreater2).toEqual(4);
  });
});
