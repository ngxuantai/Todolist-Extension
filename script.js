const addTaskForm = document.getElementById("add-task-form");
const taskInput = document.getElementById("task-input");
const disInput = document.getElementById("discription-input");
const taskList = document.getElementById("task-list");

let todos = [];
loadTodos();

function clearAll() { 
  while (taskList.firstChild != null) {
    taskList.removeChild(taskList.firstChild);
  }
}

function loadTodos() {
  chrome.storage.sync.get(["todos"], (result) => {
    if (result.todos) {
      todos = result.todos;
      renderTodos();
    }
  });
}

function renderTodos() {
    //const todos = JSON.parse(localStorage.getItem("todos")) || [];

    // Xóa toàn bộ task hiện tại trong taskList
    while (todos.firstChild != null) {
        todos.removeChild(todos.firstChild);
        chrome.storage.sync.remove("todos");
        console.log("remove");
    }
  
    // Hiển thị danh sách các task
    todos.forEach((todo, index) => {
      const todoItem = document.createElement("li");
      todoItem.innerText = todo.text;
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

//format date dd/mm/yyyy
function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [day, month, year].join("/");
}

function addTask(event) {
  // event.preventDefault();
  const taskText = taskInput.value.trim();
  if (taskText !== "" ) {
    const newTodo = {
      id: todos.length + 1,
      text: taskText,
      completed: true,
      date: formatDate(Date.now()),
    };
    todos.push(newTodo);
    saveTodos();
    taskInput.value = "";
    renderTodos();
    console.log(todos);
  }
}

function deleteTodo(index) {
  todos.splice(index, 1);
  saveTodos();
  clearAll();
  renderTodos();
  console.log(todos);
}

addTaskForm.addEventListener("submit", function (event) { 
  if(taskInput.value.trim() == ""){
    event.preventDefault();
    document.getElementById("btn-add").style.cursor = "not-allowed";
    return;
  }
  addTask(event);
});

