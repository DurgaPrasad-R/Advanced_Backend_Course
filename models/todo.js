"use strict";
const { sequelize } = require("../connectDB");
const { DataTypes, Model, Op } = require("sequelize");
const completeTodo = require("../completeTodo");
class Todo extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static async addTask(params) {
    return await Todo.create(params);
  }
  static async showList() {
    console.log("My Todo list \n");

    console.log("Overdue");
    const dueYes = await this.overdue();
    console.log(dueYes);
    console.log("\n");

    console.log("Due Today");
    const dueTod = await this.dueToday();
    console.log(dueTod);
    console.log("\n");

    console.log("Due Later");
    const FutureDue = await this.dueLater();
    console.log(FutureDue);
    console.log("\n");
  }

  static async overdue() {
    const d = new Date();
    const Items = await Todo.findAll({
      where: {
        dueDate: {
          [Op.lt]: d,
        },
      },
    });
    const todoList = Items.map((todo) => todo.displayableString()).join("\n");
    return todoList;
  }

  static async dueToday() {
    // FILL IN HERE TO RETURN ITEMS DUE tODAY
    const d = new Date();
    const Items = await Todo.findAll({
      where: {
        dueDate: {
          [Op.eq]: d,
        },
      },
    });
    const todoList = Items.map((todo) => todo.displayableString()).join("\n");
    return todoList;
  }

  static async dueLater() {
    const d = new Date();
    const Items = await Todo.findAll({
      where: {
        dueDate: {
          [Op.gt]: d,
        },
      },
    });
    const todoList = Items.map((todo) => todo.displayableString()).join("\n");
    return todoList;
  }

  // static async markAsComplete() {
  //   async function markTodoAsComplete(todoId) {
  //     await completeTodo.markAsComplete(todoId);
  //   }
  // }

  // static associate(models) {
  //   // define association here
  // }
  displayableString() {
    let checkbox = this.completed ? "[x]" : "[ ]";
    return `${this.id}. ${checkbox} ${this.title} ${this.dueDate}`;
  }
}
Todo.init(
  {
    title: DataTypes.STRING,
    dueDate: DataTypes.DATEONLY,
    completed: DataTypes.BOOLEAN,
  },
  {
    sequelize,
  },
);

module.exports = Todo;
Todo.sync();
