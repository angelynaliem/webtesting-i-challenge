const { TestScheduler } = require("jest");
const { hasUncaughtExceptionCaptureCallback } = require("process");
const enhancer = require("./enhancer.js");
// test away!

describe("testing a game's enhancement system", () => {
  describe("repair()", () => {
    test("item returns a new object with durability of 100", () => {
      const item = {
        name: "unicorn",
        enhancement: 10,
        durability: 20,
      };
      const newItem = enhancer.repair(item);
      expect(newItem.durability).toBe(100);
    });
  });

  describe("when enhancement succeeds", () => {
    test("item's enhancement increases by 1", () => {
      const item = {
        name: "unicorn",
        enhancement: 10,
        durability: 20,
      };
      const newItem = enhancer.success(item);
      expect(newItem.enhancement).toBe(11);
    });

    test("item's enhancement is not changed after reaching 20", () => {
      const item = {
        name: "unicorn",
        enhancement: 20,
        durability: 20,
      };
      const newItem = enhancer.success(item);
      expect(newItem.enhancement).toBe(20);
    });

    test("item's durability does not change", () => {
      const item = {
        name: "unicorn",
        enhancement: 20,
        durability: 20,
      };
      const newItem = enhancer.success(item);
      expect(newItem.durability).toBe(20);
    });
  });

  describe("when enhancement fails", () => {
    test("item's durability decreases by 5 when enhancement is less than 15", () => {
      const item = {
        name: "unicorn",
        enhancement: 10,
        durability: 20,
      };
      const newItem = enhancer.fail(item);
      expect(newItem.durability).toBe(15);
    });

    test("item's durability decreases by 10 when enhancement is more than 15", () => {
      const item = {
        name: "unicorn",
        enhancement: 20,
        durability: 20,
      };
      const newItem = enhancer.fail(item);
      expect(newItem.durability).toBe(10);
    });

    test("item's enhancement decreases by 1 when enhancement is more than 16", () => {
      const item = {
        name: "unicorn",
        enhancement: 17,
        durability: 20,
      };
      const newItem = enhancer.fail(item);
      expect(newItem.enhancement).toBe(16);
    });
  });

  describe("get()", () => {
    test("item's name is not modified if enhancement level is 0", () => {
      const item = {
        name: "unicorn",
        enhancement: 0,
        durability: 20,
      };
      const newItem = enhancer.get(item);
      expect(newItem.name).toBe("unicorn");
    });

    test("item's name is modified if enhancement is greater than 0", () => {
      const item = {
        name: "unicorn",
        enhancement: 17,
        durability: 20,
      };
      const newItem = enhancer.get(item);
      expect(newItem.name).toBe("[+17] unicorn");
    });
  });
});
