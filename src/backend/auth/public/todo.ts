"use strict";
const addform = document.querySelector(".add") as HTMLFormElement;
const list = document.querySelector(".todos") as HTMLDivElement;
const search = document.querySelector(".search input") as HTMLInputElement;

const generateTemplate = (todo: string) => {
  const html = `<li class="list-group-item d-flex justify-content-between align-items-center text-light">
    <span>${todo}</span>
    <i class="far fa-trash-alt delete"></i>
</li>`;
  list.innerHTML += html;
};
addform.addEventListener("submit", (e) => {
  e.preventDefault();

  const todo = addform.add.value.trim();
  if (todo.length) {
    generateTemplate(todo);
    addform.reset();
  }
});

list.addEventListener("click", (e) => {
  if ((e.target as HTMLElement).classList.contains("delete")) {
    (e.target as HTMLElement).parentElement!.remove();
  }
});

const filtertodos = (term: string) => {
  Array.from(list.children)
    .filter((todo) => todo.textContent && !todo.textContent.includes(term))
    .forEach((todo) => todo.classList.add("filtered"));

  Array.from(list.children)
    .filter((todo) => todo.textContent && todo.textContent.includes(term))
    .forEach((todo) => todo.classList.remove("filtered"));
};

search.addEventListener("keyup", () => {
  const term = search.value.trim();
  filtertodos(term);
});
async function getUser() {
  try {
    let res = await fetch("/api/user.json");
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

async function renderUsers() {
  let user = await getUser();
  let html = "";
  const newtext = `todo list of ${user.name}`;
  html += newtext;
  const titleh = document.querySelector("h1") as HTMLHeadElement;
  titleh.innerHTML = html;
}
renderUsers();
