import "./style.css";

const ul = document.querySelector("ul");
const form = document.querySelector("form");
const input = document.querySelector("form > input");

const todos = [
  {
    text: "je suis un todo",
    done: false,
    editMode: false,
  },
  {
    text: "je suis un autre todo",
    done: true,
    editMode: true,
  },
  {
    text: "je suis un dernier todo",
    done: false,
    editMode: false,
  },
];

form.addEventListener("submit", (event) => {
  //stop le rechargement de la page au submit
  event.preventDefault();
  //récupération de la valeur
  const value = input.value;
  // remise à vide de l'input
  input.value = "";
  // ajout du todo
  addTodo(value);
});

const displayTodo = () => {
  const todosNode = todos.map((todo, index) =>
    todo.editMode == true
      ? createEditElement(todo, index)
      : createTodoElement(todo, index)
  );
  ul.innerHTML = "";
  ul.append(...todosNode);
};

const createTodoElement = (todo, index) => {
  const li = document.createElement("li");
  const buttonDelete = document.createElement("button");
  buttonDelete.textContent = "Supprimer";
  buttonDelete.classList.add("danger");
  const buttonEdit = document.createElement("button");
  buttonEdit.textContent = "Editer";
  buttonEdit.classList.add("primary");
  buttonDelete.addEventListener("click", (event) => {
    event.stopPropagation();
    deleteTodo(index);
  });
  buttonEdit.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleEdit(index);
  });
  li.innerHTML = `
    <span class="todo ${todo.done ? "done" : ""}"></span>
    <p class="${todo.done ? "done" : ""}">${todo.text}</p>
    `;
  li.addEventListener("click", (event) => {
    toggleTodo(index);
  });
  li.append(buttonEdit, buttonDelete);

  return li;
};

const createEditElement = (todo, index) => {
  const li = document.createElement("li");
  const input = document.createElement("input");
  input.type = "text";
  input.value = todo.text;
  const buttonSave = document.createElement("button");
  buttonSave.textContent = "Sauvegarder";
  buttonSave.classList.add("success");
  buttonSave.addEventListener("click", (event) => {
    event.stopPropagation();
    saveContent(input, index);
  });
  const buttonCancel = document.createElement("button");
  buttonCancel.textContent = "Annuler";
  buttonCancel.classList.add("danger");
  buttonCancel.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleEdit(index);
  });
  li.append(input, buttonCancel, buttonSave);

  return li;
};

const addTodo = (text) => {
  text = text.trim();
  if (text) {
    todos.push({
      text: `${text[0].toUpperCase()}${text.slice(1)}`,
      done: false,
    });
    displayTodo();
  }
};

const deleteTodo = (index) => {
  todos.splice(index, 1);
  displayTodo();
};

const toggleTodo = (index) => {
  todos[index].done = !todos[index].done;
  displayTodo();
};

const toggleEdit = (index) => {
  todos[index].editMode = !todos[index].editMode;
  displayTodo();
};

const saveContent = (input, index) => {
  todos[index].text = input.value;
  todos[index].editMode = false;
  displayTodo();
};

displayTodo();
