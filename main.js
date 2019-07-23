function addTodoToStorage(todoObj, cb) {
    chrome.storage.sync.get('todos', (data) => {
        if (data.todos)
            var newData = [...data.todos];
        else
            var newData = [];
        newData.push(todoObj);
        chrome.storage.sync.set({todos: newData}, cb);
    });
}

function removeTodoFromStorage(key, cb) {
    chrome.storage.sync.get('todos', (data) => {
        var newData = data.todos.filter(item => item.key != key);
        chrome.storage.sync.set({todos: newData}, cb);
    });
}

// // Function to create a todo item
function createTodoItem(todoObj) {
    // main div wrapper
    let todoItem = document.createElement('div');
    todoItem.className = "todo_item";
    todoItem.setAttribute('key', todoObj.key);
    
    // text wrapper
    let todoItemText = document.createElement('div');
    todoItemText.className = "todo_item_text";
    todoItemText.innerText = todoObj.text;

    // checkbox wrapper
    let todoItemCheckBox = document.createElement('div');
    todoItemCheckBox.className = "checkbox_wrapper";
    let checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.addEventListener('change', function() {
        if (this.checked) {

            // remove todoObj from storage
            removeTodoFromStorage(todoObj.key, () => {

                // update DOM element
                todoItem.remove();
            })
        }
    });
    todoItemCheckBox.append(checkbox);

    todoItem.append(todoItemCheckBox, todoItemText);
    return todoItem;
}

function getTodoKey(cb) {
    chrome.storage.sync.get('todoKey', (data) => {
        if (data.todoKey)
            cb(data.todoKey);
        else 
            cb(1);
    });
}

let todosDiv = document.getElementById('todos');

// Adds event listener to Add ToDo element to store data on chrome storage 
let todoInput = document.getElementById('todoInput');
todoInput.onkeydown = (event) => {
    var keyCode = event.keyCode || event.which;
    if (keyCode == 13) {
        var text = event.target.value;
        
        getTodoKey((key) => {
            
            todoObj = {
                key: key,
                text: text, 
                date: Date.now()
            };

            addTodoToStorage(todoObj, () => {
                var newTodo = createTodoItem(todoObj);
                todosDiv.append(newTodo);
                event.target.value = "";
            });

            // update todo key
            chrome.storage.sync.set({'todoKey': key + 1}, () => {
                console.log("Key updated");
            });

        });

        // get next key from storage
        // create obj
        // add obj to storage
        // create DOM using storage
        // addTodoToStorage(text, () => {

        //     // create todo item and add to list of todos
        //     var newTodo = createTodoItem(text);
        //     todosDiv.append(newTodo);

        //     //remove text
        //     event.target.value = "";
        // });
    }
}

// creates and add todo items, adding properties to elements subsequently
chrome.storage.sync.get('todos', (data) => {

    for (let i = 0; i < data.todos.length; i++) {
        let todoItem = createTodoItem(data.todos[i]);
        todosDiv.append(todoItem);
    }
   
});