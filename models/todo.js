"use strict";
const { Op, Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
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
      dueYes.forEach((item) => {
        console.log(item.displayableString());
      });
      console.log("\n");

      console.log("Due Today");
      const dueTod = await this.dueToday();
      dueTod.forEach((item) => {
        console.log(item.displayableString());
      });
      console.log("\n");

      console.log("Due Later");
      const FutureDue = await this.dueLater();
      FutureDue.forEach((item) => {
        console.log(item.displayableString());
      });
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
      return Items;
    }

    static async dueToday() {
      const d = new Date();
      const Items = await Todo.findAll({
        where: {
          dueDate: {
            [Op.eq]: d,
          },
        },
      });
      return Items;
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
      return Items;
    }

    static async markAsComplete(id) {
      const item = await Todo.findByPk(id);

      item.completed = true;
      await item.save();
    }

    displayableString() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      return `${this.id}. ${checkbox} ${this.title} ${this.dueDate}`;
    }
    static associate(models) {
      // define association here
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
      modelName: "Todo",
    },
  );
  return Todo;
};
