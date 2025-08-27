 let tasks = [];
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');


addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});


taskList.addEventListener('click', function(event) {
    const li = event.target.closest('li');
    if (!li) return;
     if (event.target.classList.contains('complete-btn')) {
        toggleComplete(taskId);
    } else if (event.target.classList.contains('delete-btn')) {
        deleteTask(taskId);
    }
});

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }
    const newTask = {
        id: Date.now(),
        text: taskText,
    };


const date = Date.now()

console.log(date);

    tasks.push(newTask);
    taskInput.value = '';
    displayTasks();
    updateTaskCount();
}

function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    displayTasks();
    updateTaskCount();
}

function toggleComplete(taskId) {
    const task = tasks.find(task => task.id === taskId);
    if (task) {
        task.completed = !task.completed;
    }
    displayTasks();
    updateTaskCount();
}

function createTaskElement(task) {
    const li = document.createElement('li');
    li.className = `task-item${task.completed ? ' completed' : ''}`;
    li.dataset.taskId = task.id;
    li.innerHTML = `
        <span class="task-text">${task.text}</span>
        <div class="task-actions">
            <button class="complete-btn${task.completed ? ' completed' : ''}">
                ${task.completed ? 'Undo' : 'Done'}
            </button>
            <button class="delete-btn">Delete</button>
        </div>
    `;
    return li;
}

function displayTasks() {
    taskList.innerHTML = '';
    if (tasks.length === 0) {
        const emptyMessage = document.createElement('div');
        emptyMessage.className = 'empty-state';
        emptyMessage.textContent = 'No tasks yet. Add one above!';
        taskList.appendChild(emptyMessage);
        return;
    }
    tasks.forEach(task => {
        const taskElement = createTaskElement(task);
        taskList.appendChild(taskElement);
    });
}

function updateTaskCount() {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const pendingTasks = totalTasks - completedTasks;
    let countText = '';
    if (totalTasks === 0) {
        countText = '0 tasks';
    } else if (totalTasks === 1) {
        countText = completedTasks === 1 ? '1 task completed' : '1 task pending';
    } else {
        if (completedTasks === totalTasks) {
            countText = `All ${totalTasks} tasks completed!`;
        } else if (completedTasks === 0) {
            countText = `${totalTasks} tasks pending`;
        } else {
            countText = `${completedTasks} completed, ${pendingTasks} pending`;
        }
    }
    taskCount.textContent = countText;
}


displayTasks();
updateTaskCount();