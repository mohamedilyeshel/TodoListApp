const taskForm = document.querySelector("#task-form");
const todoList = document.querySelector(".collection");
const removeTodoButtons = document.querySelectorAll(".delete-item");
const clearAllBtn = document.querySelector(".clear-tasks");

const removeFromStorage = (todo) => {
  let todos;
  if (localStorage.getItem("todos") !== null) {
    todos = JSON.parse(localStorage.getItem("todos"));
    todos.splice(todos.indexOf(todo), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
};

const addRemoveTodo = (...rmButtons) => {
  for (let rmBtn of rmButtons) {
    rmBtn.addEventListener("click", () => {
      removeFromStorage(rmBtn.parentElement.outerText);
      rmBtn.parentElement.remove();
    });
  }
};

const createToDo = (toDoName) => {
  let todo = document.createElement("li");
  todo.classList.add("collection-item");

  let link = document.createElement("a");
  link.classList.add("delete-item", "secondary-content");

  let deleteIcon = document.createElement("i");
  deleteIcon.classList.add("fa", "fa-remove");

  todo.append(toDoName);
  link.append(deleteIcon);
  todo.append(link);
  addRemoveTodo(todo.children[0]);
  todoList.append(todo);

  return todo.outerText;
};

const storageToDos = () => {
  if (localStorage.getItem("todos") !== null) {
    let todos = JSON.parse(localStorage.getItem("todos"));
    for (let todo of todos) {
      createToDo(todo);
    }
  }
};

const addToDoStorage = (todo) => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);

  localStorage.setItem("todos", JSON.stringify(todos));
};

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let todo = createToDo(taskForm.elements.task.value);
  addToDoStorage(todo);
});

clearAllBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (todoList.children.length > 0) {
    // let l = todoList.children.length;
    // for (let i = 0; i < l; i++) {
    //   todoList.children[0].remove();
    // }
    const todoAr = Array.from(todoList.children);
    todoAr.forEach((todo) => {
      todo.remove();
    });
    localStorage.clear();
  }
});

storageToDos();
addRemoveTodo(...removeTodoButtons);
