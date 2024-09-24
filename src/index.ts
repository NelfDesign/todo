import { Todo } from "./interfaces/todo.interface";
import "./styles/style.css";

const ul: HTMLUListElement = document.querySelector("ul")!;
const form: HTMLFormElement = document.querySelector("form")!;
const input: HTMLInputElement =
  document.querySelector<HTMLInputElement>("form > input")!;

const todos: Todo[] = [
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

form.addEventListener("submit", (event: Event): void => {
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
  const todosNode: HTMLLIElement[] = todos.map((todo: Todo, index: number) =>
    todo.editMode == true
      ? createEditElement(todo, index)
      : createTodoElement(todo, index)
  );
  ul.innerHTML = "";
  ul.append(...todosNode);
};

const createTodoElement = (todo: Todo, index: number): HTMLLIElement => {
  const li: HTMLLIElement = document.createElement("li");
  const buttonDelete: HTMLButtonElement = document.createElement("button");
  buttonDelete.textContent = "Supprimer";
  buttonDelete.classList.add("danger");
  const buttonEdit: HTMLButtonElement = document.createElement("button");
  buttonEdit.textContent = "Editer";
  buttonEdit.classList.add("primary");
  buttonDelete.addEventListener("click", (event: MouseEvent) => {
    event.stopPropagation();
    deleteTodo(index);
  });
  buttonEdit.addEventListener("click", (event: MouseEvent) => {
    event.stopPropagation();
    toggleEdit(index);
  });
  li.innerHTML = `
    <span class="todo ${todo.done ? "done" : ""}"></span>
    <p class="${todo.done ? "done" : ""}">${todo.text}</p>
    `;
  li.addEventListener("click", () => {
    toggleTodo(index);
  });
  li.append(buttonEdit, buttonDelete);

  return li;
};

const createEditElement = (todo: Todo, index: number): HTMLLIElement => {
  const li: HTMLLIElement = document.createElement("li");
  const input: HTMLInputElement = document.createElement("input");
  input.type = "text";
  input.value = todo.text;
  input.setAttribute("index", index + "");
  const buttonSave: HTMLButtonElement = document.createElement("button");
  buttonSave.textContent = "Sauvegarder";
  buttonSave.classList.add("success");
  buttonSave.addEventListener("click", () => {
    saveContent(input, index);
  });
  const buttonCancel: HTMLButtonElement = document.createElement("button");
  buttonCancel.textContent = "Annuler";
  buttonCancel.classList.add("danger");
  buttonCancel.addEventListener("click", (event: MouseEvent) => {
    event.stopPropagation();
    toggleEdit(index);
  });
  li.append(input, buttonCancel, buttonSave);

  return li;
};

const addTodo = (text: string): void => {
  text = text.trim();
  if (text) {
    todos.push({
      text: `${text[0]?.toUpperCase()}${text.slice(1)}`,
      done: false,
      editMode: false,
    });
    displayTodo();
  }
};

const deleteTodo = (index: number): void => {
  todos.splice(index, 1);
  displayTodo();
};

const toggleTodo = (index: number): void => {
  todos[index]!.done = !todos[index]!.done;
  displayTodo();
};

const toggleEdit = (index: number): void => {
  todos[index]!.editMode = !todos[index]!.editMode;
  displayTodo();
};

const saveContent = (input: HTMLInputElement, index: number): void => {
  todos[index]!.text = input.value;
  todos[index]!.editMode = false;
  displayTodo();
};

displayTodo();
