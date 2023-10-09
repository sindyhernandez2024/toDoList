const taskForm = document.getElementById("task-form");
const taskList = document.getElementById("task-list");

const titleInput = document.getElementById("task-title");
const descriptionInput = document.getElementById("task-description");

const MAX_TASKS = 10; // Establecer un límite máximo de tareas

class Task {
    constructor(title, description) {
        this.title = title;
        this.description = description;
        this.completed = false;
    }

    toggleCompletion() {
        this.completed = !this.completed;
    }
}

// Función para cargar tareas desde el almacenamiento local
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    for (const task of tasks) {
        addTaskToDOM(task);
    }
}

// Función para guardar tareas en el almacenamiento local
function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Función para agregar una tarea al DOM
function addTaskToDOM(task) {
    const taskItem = document.createElement("li");
    const completeButton = document.createElement("button");
    completeButton.className = "complete-button";
    completeButton.innerText = task.completed ? "✔️" : "Completar";

    completeButton.addEventListener("click", function () {
        task.toggleCompletion();
        completeButton.innerText = task.completed ? "✔️" : "Completar";
        saveTasks(tasks);
    });

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.innerText = "Eliminar";

    deleteButton.addEventListener("click", function () {
        taskItem.remove();
        const taskIndex = tasks.indexOf(task);
        if (taskIndex !== -1) {
            tasks.splice(taskIndex, 1);
            saveTasks(tasks);
        }
    });

    taskItem.innerHTML = `
        <h3>${task.title}</h3>
        <p>${task.description}</p>
    `;

    taskItem.appendChild(completeButton);
    taskItem.appendChild(deleteButton);

    taskList.appendChild(taskItem);
}

// Cargar tareas al cargar la página
const tasks = [];
loadTasks();

taskForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const taskTitle = titleInput.value.trim();
    const taskDescription = descriptionInput.value.trim();

    if (taskTitle === "") {
        alert("El título de la tarea no puede estar vacío.");
        return;
    }

    // Verificar si se ha alcanzado el límite máximo de tareas
    if (taskList.childElementCount >= MAX_TASKS) {
        alert("Se ha alcanzado el límite máximo de tareas.");
        return;
    }

    const task = new Task(taskTitle, taskDescription);
    tasks.push(task);
    saveTasks(tasks);

    addTaskToDOM(task);

    // Limpiar el formulario
    taskForm.reset();
});