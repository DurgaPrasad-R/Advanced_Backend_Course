const todoList = (today) => {
  const all = [];
  const add = (todoTask) => {
    all.push(todoTask);
  };
  const markAsCompleted = (index) => {
    all[index].completed = true; // Changed to lowercase "completed"
  };
  const overdue = () => {
    return all.filter((task) => task.dueDate < today);
  };
  const dueToday = () => {
    return all.filter((task) => task.dueDate === today);
  };
  const dueLater = () => {
    return all.filter((task) => task.dueDate > today);
  };
  const todoDisplayablelist = (list) => {
    return list.map((task) => {
      const status = task.completed ? "[X]" : "[]"; // Changed to lowercase "completed"
      if (task.dueDate === today) {
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

module.exports = todoList;
