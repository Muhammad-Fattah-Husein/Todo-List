const text = document.getElementById("newtask");
const add = document.getElementById("addbtn");
const list = document.getElementById("list");

let tasks = ["Tugas 1"];

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
        text.value = "";
        renderList();
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
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