document.addEventListener('DOMContentLoaded', function() {
    //display items
    var getAndDisplayTasks = function () {
        $.ajax({
            type: 'GET',
            url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=135',
            dataType: 'json',
            success: function (response, textStatus) {
                $('#todo-list').empty();
                response.tasks.forEach(function (task) {
                    if (filterCheck(task)==true) {
                        $('#todo-list').append('<div class="row"><p class="col-xs-8">' + task.content + 
                        '</p><button class="delete ml-4" data-id="' + task.id + '">Delete</button><input type="checkbox" class="mark-complete ml-3" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '>');
                    }
                })
            },
            error: function (request, textStatus, errorMessage) {
                console.log(errorMessage);
            }
        });
    };
   
    // add items
    var createTask = function() {
        $.ajax({
        type: 'POST',
            url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=135',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({
            task: {
                content:  $('#new-task-content').val()
            }
            }),
            success: function (response, textStatus) {
                $('#new-task-content').val('');
                getAndDisplayTasks();
            },
            error: function (request, textStatus, errorMessage) {
                console.log(errorMessage);
            }
        });
    };

    $('#create-task').on('submit', function (e) {
        e.preventDefault();
        createTask();
    });

    getAndDisplayTasks();

    //delete items
    var deleteTask = function (id) {
        $.ajax({
            type: 'DELETE',
            url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '?api_key=135',
            success: function (response, textStatus) {
                getAndDisplayTasks();
            },
            error: function (request, textStatus, errorMessage) {
                console.log(errorMessage);
            }
        });
    };
    
    $(document).on('click', '.delete', function () {
        deleteTask($(this).data('id'));
    });

    //mark complete
    var markTaskComplete = function (id) {
        $.ajax({
            type: 'PUT',
            url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '/mark_complete?api_key=135',
            dataType: 'json',
            success: function (response, textStatus) {
                getAndDisplayTasks();
            },
            error: function (request, textStatus, errorMessage) {
                console.log(errorMessage);
            }
        });
    };

    //mark active
    var markTaskActive = function (id) {
        $.ajax({
            type: 'PUT',
            url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '/mark_active?api_key=135',
            dataType: 'json',
            success: function (response, textStatus) {
                getAndDisplayTasks();
            },
            error: function (request, textStatus, errorMessage) {
                console.log(errorMessage);
            }
        });
    };

    $(document).on('change', '.mark-complete', function () {
        if (this.checked) {
            markTaskComplete($(this).data('id'));
        } else {
            markTaskActive($(this).data('id'));
        }
    });

    // filter
    
    var filterCheck = function (ele) {
        /*console.log(ele.completed);
        console.log(document.querySelector('#fil-active').checked);
        console.log(document.querySelector('#fil-complete').checked);*/
        
        if (ele.completed == true && document.querySelector('#fil-complete').checked) {
            return true;
        }
        if (ele.completed == false && document.querySelector('#fil-active').checked) {
            return true;
        }
        else {return false;}
    }

    $(document).on('change', '.filter', function () {
        getAndDisplayTasks();
    });
});
