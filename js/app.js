const newTodoText = document.querySelector("#newTodoText");
const newTodoButton = document.querySelector("#newTodoButton");
const todoList = document.querySelector("#todoList");
const todoTemplate = document.querySelector("#todoTemplate").content;

class Todo {
    constructor(tid, message) {
        this.tid = tid;
        this.message = message;
    }
}

function agregarNewTodo() {
    //crear nuevo todo
    tid = String(Date.now());
    const nTodo = new Todo(tid, newTodoText.value);

    //agregar todo al local storage
    localStorage.setItem(tid, JSON.stringify(nTodo));
    return tid;
}

function borrarTodos() {
    //se puede mejorar reemplazando el todoList completo por un fragment vacio de esta manera se evita el reflow a cada iteración
    while (todoList.firstChild) {
        todoList.removeChild(todoList.firstChild);
    }
}

function listenerEliminarPaTodos() {
    if (localStorage.length <= 0) return;

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        let Eliminarbutton = document.querySelector(`#tid${key} button`);

        Eliminarbutton.addEventListener("click", (e) => {
            e.preventDefault();
            console.log(`eliminar todo id ${key}`);
            Eliminarbutton.parentElement.remove();
            localStorage.removeItem(key);
        });
    }
}

function pintarTodos() {
    //leer todos los todos del local storage
    const fragment = document.createDocumentFragment();
    if (localStorage.length <= 0) return;

    for (let i = 0; i < localStorage.length; i++) {
        let clone = todoTemplate.cloneNode(true);

        let key = localStorage.key(i);
        const item = JSON.parse(localStorage.getItem(key));
        const itemMessage = item.message;
        clone.querySelector(".todo").setAttribute("id", `tid${item.tid}`);
        clone.querySelector(".todoText").textContent = itemMessage;

        fragment.appendChild(clone.querySelector(".todo"));
    }

    todoList.appendChild(fragment);
}

newTodoButton.addEventListener("click", (e) => {
    e.preventDefault();

    if (!newTodoText.value) {
        return;
    }

    agregarNewTodo();
    borrarTodos();
    pintarTodos();
    listenerEliminarPaTodos();

    newTodoText.textContent = "";
    newTodoText.value = "";
});

pintarTodos();
