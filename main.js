let todoInput = document.getElementById('todoInput');
todoInput.onkeydown = (event) => {
    var keyCode = event.keyCode || event.which;
    if (keyCode == 13) {
        var text = event.target.value;
        chrome.storage.sync.get('todos', (data) => {
            if (data.todos)
                var newData = [...data.todos];
            else
                var newData = [];
            newData.push({text: text, date: Date.now()});
            chrome.storage.sync.set({todos: newData}, () => {
                console.log("Todos updated");
            })
        });
    }
}