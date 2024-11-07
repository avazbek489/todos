const form = document.querySelector(`#form`);
const field = document.querySelector(`#field`);
const todoWrapper = document.querySelector(`#togos-items`);
const clear = document.querySelector(`#clear-all`);
function save(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}
function load() {
  const todos = localStorage.getItem("todos");
  return todos ? JSON.parse(todos) : [];
}
function rToDo() {
  todoWrapper.innerHTML = "";
  const todos = load();
  todos.forEach((value) => {
    const card = createCard(value);
    todoWrapper.innerHTML += card;
  });
}
function validate(field) {
  if (field.value.length < 4) {
    alert("ToDo eng kamida 4ta belgidan iborat bo'lishi shart");
    field.focus();
    return false;
  }
  return true;
}
function createCard(data) {
  return `
    <div class="todo-item" data-id="${data.id}">
        <p>${data.name}</p>
        <span onclick="deleteTodo(${data.id})">delete</span>
    </div>
  `;
}
function addTodo() {
  if (!validate(field)) return;
  const todo = {
    id: Date.now(),
    name: field.value,
  };
  const todos = load();
  todos.push(todo);
  save(todos);
  todoWrapper.innerHTML += createCard(todo);
  field.value = "";
}
function deleteTodo(con) {
  if (
    confirm("Aniq shu todo ni o'chirmoqchimisiz Keyin uni qaytara olmaysiz.")
  ) {
    const todos = load().filter((todo) => todo.id !== con);
    save(todos);
    rToDo();
  }
}
function clearAll() {
  if (
    confirm(
      "Aniq barcha todo larni o'chirib tashlamoqchimisiz Keyin ularni qaytara olmaysiz."
    )
  ) {
    localStorage.removeItem("todos");
    rToDo();
  }
}
form.addEventListener("submit", function (event) {
  event.preventDefault();
  addTodo();
});
clear.addEventListener("click", clearAll);
window.addEventListener("load", rToDo);