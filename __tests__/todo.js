/* eslint-disable no-undef */
const db = require("../models");

describe("Todolist Test Suite", () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
  });

  test("Should add new todo", async () => {
    const todoItemsCount = await db.Todo.count();
    await db.Todo.addTask({
      title: "Test todo",
      completed: false,
      dueDate: new Date(),
    });
    const newTodoItemsCount = await db.Todo.count();
    expect(newTodoItemsCount).toBe(todoItemsCount + 1);
  });

  test("Should mark todo as Complete", async () => {
    const newTodo = await db.Todo.addTask({
      title: "Test Todo",
      completed: false,
      dueDate: new Date(),
    });

    expect(newTodo.completed).toBe(false);

    await db.Todo.markAsComplete(newTodo.id);
    const markedTodo = await db.Todo.findByPk(newTodo.id);

    expect(markedTodo.completed).toBe(true);
  });

  test("To Check for the retrieval of OverDue items", async () => {
    const befOverdue = await db.Todo.overdue();
    const currentDate = new Date();
    const yesterday = new Date();
    yesterday.setDate(currentDate.getDate() - 1);

    await db.Todo.addTask({
      title: "Overdue Task",
      completed: false,
      dueDate: yesterday.toISOString().split("T")[0],
    });

    const overdueTasks = await db.Todo.overdue();
    expect(overdueTasks.length).toBe(befOverdue.length + 1);
  });

  test("To Check for the retrieval of DueTasks today", async () => {
    const befDueToday = await db.Todo.dueToday();

    await db.Todo.addTask({
      title: "Today Task",
      completed: false,
      dueDate: new Date().toISOString().split("T")[0],
    });

    const dueTodayTasks = await db.Todo.dueToday();
    expect(dueTodayTasks.length).toBe(befDueToday.length + 1);
  });

  test("To Check for the retrieval of Future Tasks", async () => {
    const befDueLater = await db.Todo.dueLater();

    const currentDate = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(currentDate.getDate() + 1);

    await db.Todo.addTask({
      title: "Future Task",
      completed: false,
      dueDate: tomorrow.toISOString().split("T")[0],
    });

    const dueLaterTasks = await db.Todo.dueLater();
    expect(dueLaterTasks.length).toBe(befDueLater.length + 1);
  });
});
