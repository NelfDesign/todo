import "./style.css";

const ul = document.querySelector("ul");
const form = document.querySelector("form");
const input = document.querySelector("form > input");

const todos = [
  {
    text: "je suis un todo",
    done: false,
  },
  {
    text: "je suis un autre todo",
    done: true,
  },
  {
    text: "je suis un dernier todo",
    done: false,
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
  const todosNode = todos.map((todo, index) => createTodoElement(todo, index));
  ul.innerHTML = "";
  ul.append(...todosNode);
};

const createTodoElement = (todo, index) => {
  const li = document.createElement("li");
  const buttonDelete = document.createElement("button");
  buttonDelete.textContent = "Supprimer";
  buttonDelete.addEventListener("click", (event) => {
    event.stopPropagation();
    deleteTodo(index);
  });
  li.innerHTML = `
    <span class="todo ${todo.done ? "done" : ""}"></span>
    <p>${todo.text}</p>
    `;
    li.addEventListener('click', (event)=>{
        toggleTodo(index);
    });
  li.appendChild(buttonDelete);

  return li;
};

const addTodo = (text) => {
  todos.push({
    text,
    done: false,
  });
  displayTodo();
};

const deleteTodo = (index) => {
  todos.splice(index, 1);
  displayTodo();
};

const toggleTodo = (index) =>{
    todos[index].done = !todos[index].done;
    displayTodo();
}

displayTodo();
