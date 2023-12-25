/* eslint-disable no-undef */
const todoList = require("../todo");

const { all, markAsCompleted, add, overdue } = todoList();

describe("TodoList Test Suite", () => {
  beforeAll(() => {
    add({
      title: "Test Todo",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
  });
  test("Should add new todo", () => {
    const todoItemCount = all.length;
    add({
      title: "Test Todo",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
    expect(all.length).toBe(todoItemCount + 1);
  });

  test("Should mark todo as Complete", () => {
    expect(all[0].completed).toBe(false);
    markAsCompleted(0);
    expect(all[0].completed).toBe(true);
  });

  test("To Check for the retrieval of OverDue items", () => {
    const currentDate = new Date();
    const yesterday = new Date();
    yesterday.setDate(currentDate.getDate() - 1);
    const befOverDue = overdue();
    add({
      title: "Overdue Task",
      completed: false,
      dueDate: yesterday.toISOString().split("T")[0],
    });
    const overdueTasks = overdue();
    expect(overdueTasks.length).toBe(befOverDue.length + 1);
  });
});
