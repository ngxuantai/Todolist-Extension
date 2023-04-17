const addTaskForm = document.getElementById("add-task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

let todos = [];

function renderTodos() {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];

    // Xóa toàn bộ task hiện tại trong taskList
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
  
    // Hiển thị danh sách các task
    todos.forEach((todo, index) => {
      const todoItem = document.createElement("li");
      todoItem.innerText = todo;
      todoItem.setAttribute("data-id", index);
  
      // Thêm button để xóa task
      const deleteBtn = document.createElement("button");
      deleteBtn.innerText = "X";
      deleteBtn.addEventListener("click", () => {
        deleteTodo(index);
      });
      todoItem.appendChild(deleteBtn);
  
      taskList.appendChild(todoItem);
    });
}

function saveTodos() {
  chrome.storage.sync.set({ todos: todos });
}

function loadTodos() {
  chrome.storage.sync.get(["todos"], (result) => {
    if (result.todos) {
      todos = result.todos;
      renderTodos();
    }
  });
}

function addTask(event) {
  event.preventDefault();
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    const newTodo = {
      id: todos.length + 1,
      text: taskText,
      completed: true,
    };
    todos.push(newTodo);
    console.log(todos);
    saveTodos();
    taskInput.value = "1233333";
    renderTodos();
    
  }
}

addTaskForm.addEventListener("submit", addTask);

loadTodos();
