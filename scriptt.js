const taskInput = document.getElementById('taskInput');
const taskStatus = document.getElementById('taskStatus'); // Dropdown baru
const addBtn = document.getElementById('addBtn');
const listTodo = document.getElementById('list-todo');
const listDoing = document.getElementById('list-doing');
const listDone = document.getElementById('list-done');

const STATUS = {
    TODO: 'todo',
    DOING: 'doing',
    DONE: 'done'
};

// Get data from LocalStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
    listTodo.innerHTML = '';
    listDoing.innerHTML = '';
    listDone.innerHTML = '';

    tasks.forEach((task, index) => {
        let targetList;
        if (task.status === STATUS.TODO) targetList = listTodo;
        else if (task.status === STATUS.DOING) targetList = listDoing;
        else if (task.status === STATUS.DONE) targetList = listDone;

        const card = document.createElement('div');
        card.className = 'task-card';
        card.innerHTML = `
            <div class="task-title">${task.title}</div>
            <div class="card-controls">
                <select class="status-select" onchange="changeStatus(${index}, this.value)">
                    <option value="todo" ${task.status === STATUS.TODO ? 'selected' : ''}>To Do</option>
                    <option value="doing" ${task.status === STATUS.DOING ? 'selected' : ''}>In Progress</option>
                    <option value="done" ${task.status === STATUS.DONE ? 'selected' : ''}>Done</option>
                </select>
                <div>
                    <button class="btn-action btn-edit" onclick="editTask(${index})">Edit</button>
                    <button class="btn-action btn-delete" onclick="deleteTask(${index})">Delete</button>
                </div>
            </div>
        `;

        targetList.appendChild(card);
    });
}

// Add Task - Langsung ambil value dari dropdown
addBtn.addEventListener('click', () => {
    const title = taskInput.value.trim();
    const statusDipilih = taskStatus.value;

    if (title === '') {
        alert('Please enter a task title!');
        return;
    }

    const newTask = {
        title: title,
        status: statusDipilih
    };

    tasks.push(newTask);
    saveAndRender();
    taskInput.value = ''; // Reset input
    taskStatus.value = 'todo'; // Reset dropdown ke To Do
});

function deleteTask(index) {
    if (confirm('Are you sure you want to delete this task?')) {
        tasks.splice(index, 1);
        saveAndRender();
    }
}

function editTask(index) {
    const newTitle = prompt('Edit Task Title:', tasks[index].title);
    if (newTitle !== null && newTitle.trim() !== '') {
        tasks[index].title = newTitle.trim();
        saveAndRender();
    }
}

function changeStatus(index, newStatus) {
    tasks[index].status = newStatus;
    saveAndRender();
}

function saveAndRender() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

renderTasks();