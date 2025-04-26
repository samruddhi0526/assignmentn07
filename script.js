// script.js
$(document).ready(function() {
    const taskList = JSON.parse(localStorage.getItem('tasks')) || [];

    function populateTaskList() {
        $('#taskList').empty();
        taskList.forEach((task, index) => {
            $('#taskList').append(`
                <li class="list-group-item">
                    <span>${task}</span>
                    <div>
                        <button class="btn btn-warning btn-sm editBtn" data-index="${index}">Edit</button>
                        <button class="btn btn-danger btn-sm deleteBtn" data-index="${index}">Delete</button>
                    </div>
                </li>
            `);
        });
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(taskList));
    }

    $('#addTaskBtn').on('click', function() {
        const taskInput = $('#taskInput').val();
        if (taskInput) {
            taskList.push(taskInput);
            saveTasks();
            populateTaskList();
            $('#taskInput').val('');
        } else {
            alert('Please enter a task.');
        }
    });

    $(document).on('click', '.deleteBtn', function() {
        const index = $(this).data('index');
        taskList.splice(index, 1);
        saveTasks();
        populateTaskList();
    });

    $(document).on('click', '.editBtn', function() {
        const index = $(this).data('index');
        const task = taskList[index];
        $('#taskInput').val(task);
        taskList.splice(index, 1);
        saveTasks();
        populateTaskList();
    });

    populateTaskList();
});