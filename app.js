const formTask = document.getElementById("formTask");
const input = document.getElementById("input");
const listTask = document.getElementById("listTask");
const template = document.getElementById("template").content;
const fragment = document.createDocumentFragment();
let tareas = {};

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem('tareas')) {
        tareas = JSON.parse(localStorage.getItem('tareas'));
    }
    addTask();
})
// console.log(Date.now())

listTask.addEventListener('click', (e) => {
    btnAdd(e)
})

formTask.addEventListener('submit', e => {
    e.preventDefault();
    // FORMAS DE SELECCIONAR LOS VALORES
    // console.log(e.target[0].value);
    // console.log(e.target.querySelector("input").value);
    // console.log(input.value);

    setTask(e)
})

const setTask = (e) => {
    if (input.value.trim() === "") {
        alert("completa el campo");
        return
    }
    const task = {
        id: Date.now(),
        texto: input.value,
        estado: false
    }
    tareas[task.id] = task
    formTask.reset();
    input.focus();

    addTask();
}

const addTask = () => {
    localStorage.setItem('tareas', JSON.stringify(tareas));

    if (Object.values(tareas).length === 0) {
        listTask.innerHTML = `
            <div class="alert alert-dark text-center">
                No hay tareas pendietes 👌👌
            </div> `;
        return
    }
    listTask.innerHTML = "";
    Object.values(tareas).forEach(task => {
        const clone = template.cloneNode(true)
        clone.querySelector('p').textContent = task.texto
        if (task.estado) {
            clone.querySelector('.alert').classList.replace('alert-warning', 'alert-primary');
            clone.querySelectorAll('.fa-solid')[0].classList.replace('fa-circle-check', 'fa-undo-alt');
            clone.querySelector('p').style.textDecoration = 'line-through';
        }
        clone.querySelectorAll('.fa-solid')[0].dataset.id = task.id
        clone.querySelectorAll('.fa-solid')[1].dataset.id = task.id
        fragment.appendChild(clone)
    })
    listTask.appendChild(fragment)
}

const btnAdd = (e) => {
    console.log(e.target.classList.contains('fa-circle-check'));
    if (e.target.classList.contains('fa-circle-check')) {
        // console.log(e.target.dataset.id)
        tareas[e.target.dataset.id].estado = true;
        addTask();
        console.log(tareas);
    }

    if (e.target.classList.contains('fa-circle-minus')) {
        delete tareas[e.target.dataset.id];
        addTask();
        console.log(tareas);
    }
    if (e.target.classList.contains('fa-undo-alt')) {
        tareas[e.target.dataset.id].estado = false;
        addTask();
    }
    e.stopPropagation()
}