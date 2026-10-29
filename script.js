const text = document.getElementById("newtask");
const add = document.getElementById("addbtn");
const list = document.getElementById("list");
const storageKey = "todoTasks";

function loadTasks() {
    try {
        const savedTasks = localStorage.getItem(storageKey);

        if (savedTasks === null) {
            return ["Tugas 1"];
        }

        const parsedTasks = JSON.parse(savedTasks);
        if (!Array.isArray(parsedTasks) || !parsedTasks.every((task) => typeof task === "string")) {
            throw new Error("Saved tasks have an invalid format.");
        }

        return parsedTasks;
    } catch (error) {
        console.error("Could not load tasks from local storage.", error);
        alert("Data tugas tidak dapat dibaca dari penyimpanan browser.");
        return ["Tugas 1"];
    }
}

let tasks = loadTasks();

function saveTasks() {
    try {
        localStorage.setItem(storageKey, JSON.stringify(tasks));
    } catch (error) {
        console.error("Could not save tasks to local storage.", error);
        alert("Data tugas tidak dapat disimpan di browser.");
    }
}

function renderList() {
    list.innerHTML = "";

    tasks.forEach((taskText, index) => {
        const li = document.createElement("li");
        li.innerText = taskText;

        const button = document.createElement("button");
        button.innerText = "Delete";
        button.type = "button";
        button.classList.add("delete-button");
        button.addEventListener("click", () => deleteTask(index));

        li.appendChild(button);
        list.appendChild(li);
    });
}

function addTask() {
    const newTask = text.value.trim();

    if (newTask !== "") {
        tasks.push(newTask);
        saveTasks();
        text.value = "";
        renderList();
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderList();
}

if (add) {
    add.addEventListener("click", addTask);
}

if (text) {
    text.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            addTask();
        }
    });
}

renderList();