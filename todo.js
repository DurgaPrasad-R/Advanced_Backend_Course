const todoList = () => {
  all = [];
  const add = (todoTask) => {
    all.push(todoTask);
  };
  const markAsCompleted = (index) => {
    all[index].Completed = true;
  };
  const overdue = () => {
    return all.filter((task) => task.dueDate < today);
  };
  const dueToday = () => {
    return all.filter((task) => task.dueDate == today);
  };
  const dueLater = () => {
    return all.filter((task) => task.dueDate > today);
  };
  const todoDisplayablelist = (list) => {
    return list.map((task) => {
      const status = task.Completed ? "[X]" : "[]";
      if (task.dueDate == today) {
        return `${status} ${task.title}`;
      } else {
        return `${status} ${task.title} ${task.dueDate}`;
      }
    });
  };

  return {
    all,
    add,
    markAsCompleted,
    overdue,
    dueToday,
    dueLater,
    todoDisplayablelist,
  };
};

const todos = todoList();
const formattedDate = (d) => {
  return d.toISOString().split("T")[0];
};
const dateToday = new Date();
const today = formattedDate(dateToday);
dateToday.setDate(dateToday.getDate() - 1);
const yesterday = formattedDate(dateToday);
dateToday.setDate(dateToday.getDate() + 2);
const tomorrow = formattedDate(dateToday);
todos.add({
  title: "Submit Assignment",
  dueDate: yesterday,
  Completed: false,
});
todos.add({ title: "Pay Rent", dueDate: today, Completed: true });
todos.add({ title: "Service Vehicle", dueDate: today, Completed: false });
todos.add({ title: "File taxes", dueDate: tomorrow, Completed: false });
todos.add({
  title: "Pay Electric Bills",
  dueDate: tomorrow,
  Completed: false,
});
console.log("MY TODO LIST\n");

console.log("OverDue");
var overdues = todos.overdue();
var formattedOverdues = todos.todoDisplayablelist(overdues);
console.log(formattedOverdues);

console.log("\n");

console.log("Due Today");
var duesToday = todos.dueToday();
var formattedDuesToday = todos.todoDisplayablelist(duesToday);
console.log(formattedDuesToday);

console.log("\n");

console.log("Due Later");
var duesLater = todos.dueLater();
var formattedDuesLater = todos.todoDisplayablelist(duesLater);
console.log(formattedDuesLater);
