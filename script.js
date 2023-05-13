const btnAddTask = document.getElementById("btn-add-task");
const addTaskForm = document.getElementById("add-task-form");
const taskInput = document.getElementById("txt-task-input");
const disInput = document.getElementById("txt-dis-input");
const addBtn = document.getElementById("btn-add");
const cancelBtn = document.getElementById("btn-cancel");
const taskList = document.getElementById("list-task");
const x = document.getElementById("snackbar");

let todos = [];

function closeForm() {
  addTaskForm.style.display = "none";
  taskInput.value = "";
  disInput.value = "";
}

function createTask(id, task, dis) {
  const task_el = document.createElement('div');
  task_el.classList.add('tasks');
  task_el.setAttribute("data-id", id);

  taskList.appendChild(task_el);

  const task_content = document.createElement('div');
  task_content.classList.add('task_content');

  task_el.appendChild(task_content);

  const task_input = document.createElement('input');
  task_input.classList.add('txt-task');
  task_input.type = "text";
  task_input.value = task;
  task_input.setAttribute("readonly", true);

  task_content.appendChild(task_input);

  const task_dis = document.createElement('input');
  task_dis.classList.add('txt-dis');
  task_dis.type = "text";
  task_dis.value = dis;
  task_dis.setAttribute("readonly", true);

  task_content.appendChild(task_dis);

  const task_action = document.createElement('div');
  task_action.classList.add('action');

  task_el.appendChild(task_action);

  const task_edit = document.createElement('button');
  task_edit.classList.add('btn-edit');
  task_edit.innerHTML = "Edit";

  task_action.appendChild(task_edit);

  task_edit.addEventListener("click", () => {
    if(task_edit.innerHTML === "Edit") {
      task_edit.innerHTML = "Save";
      task_input.removeAttribute("readonly");
      task_dis.removeAttribute("readonly");
    } else {
      task_edit.innerHTML = "Edit";
      task_input.setAttribute("readonly", true);
      task_dis.setAttribute("readonly", true);
      editTodo(id);
    }
  });

  const task_delete = document.createElement('button');
  task_delete.classList.add('btn-delete');
  task_delete.innerHTML = "Delete";

  task_action.appendChild(task_delete);

  task_delete.addEventListener("click", () => {
    taskList.removeChild(task_el);
    deleteTodo(task, dis, id);
  });
}

const editTodo = (id) => {
  const taskInput = document.querySelector(`div[data-id="${id}"] .txt-task`);
  const disInput = document.querySelector(`div[data-id="${id}"] .txt-dis`);
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].date.replace(/[/:\s,]/g, '') === id) {
      todos[i].txt_task = taskInput.value;
      todos[i].txt_dis = disInput.value;
    }
  }
  saveTask();
};

const deleteTodo = (task, dis, id) => {
  for (let i = 0; i < todos.length; i++) {

    console.log(todos[i].date.replace(/[/:\s,]/g, ''));
    if (todos[i].date.replace(/[/:\s,]/g, '') === id) {
      todos.splice(i, 1);
    }
  }
  saveTask();
};

function loadTask() {
  chrome.storage.sync.get(["todos"], (result) => {
    if (result.todos) {
      todos = result.todos;
      todos.forEach((todo, index) => {
        createTask(todo.date.replace(/[/:\s,]/g, ''), todo.txt_task, todo.txt_dis);
      });
    }
  });
}

function formatDateToId() {
  const datetime = new Date().toLocaleString();
  var formattedDateTime = datetime.replace(/[/:\s,]/g, '');
  return formattedDateTime;
}

function addTask() {
  const newTodo = {
    id: todos.length + 1,
    txt_task: taskInput.value,
    txt_dis: disInput.value,
    done: false,
    date: new Date().toLocaleString(),
  };
  todos.push(newTodo);
  saveTask();
  createTask(newTodo.date.replace(/[/:\s,]/g, '') ,newTodo.txt_task, newTodo.txt_dis);
  console.log(todos);
}

function saveTask() {
  chrome.storage.sync.set({ todos: todos });
}

loadTask();

// open form to add task
btnAddTask.addEventListener("click", function (event) {
  addTaskForm.style.display = "block";
});

// close form to add task
cancelBtn.addEventListener("click", function (event) {
  event.preventDefault();
  closeForm();
});

// add task
addBtn.addEventListener("click", function (event) {
  event.preventDefault();
  const task = taskInput.value;
  const dis = disInput.value;
  if (task === "" || dis === "") {  
    x.innerHTML = "Please fill out all fields";
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  } else {
    addTask();
    closeForm();
  }
});

taskInput.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();
  }
});

disInput.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();
  }
});
