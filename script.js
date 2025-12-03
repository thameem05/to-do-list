const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

window.onload = () => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach((task) => createTask(task.text, task.done));
};

addBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    createTask(taskText);
    saveTask(taskText, false);
    taskInput.value = "";
  }
});

function createTask(text, done = false) {
  const li = document.createElement("li");
  li.textContent = text;
  if (done) li.classList.add("done");

  li.addEventListener("click", () => {
    li.classList.toggle("done");
    updateLocalStorage();
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "✖";
  deleteBtn.className = "delete";
  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    li.classList.add("slideOut");
    setTimeout(() => {
      li.remove();
      updateLocalStorage();
    }, 300);
  });

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

function saveTask(text, done) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text, done });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateLocalStorage() {
  const tasks = [];
  document.querySelectorAll("#task-list li").forEach((li) => {
    tasks.push({
      text: li.firstChild.textContent,
      done: li.classList.contains("done"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
