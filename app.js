const btn = document.getElementById("btn");
const input = document.getElementById("input");
const result = document.getElementById("result");
const btndelet = document.getElementById("delete");
const h2 = document.getElementById("h2text");
const theme = document.getElementById("theme");
const ball = document.getElementById("ball");
const display = document.querySelector(".display");
const displayshow = document.querySelector(".displayone");
const displayspan = document.querySelector(".display1");
const displayspan1 = document.querySelector(".displayspan");

btn.addEventListener("click", addtodo);
input.addEventListener("keyup", function(event) {
  if (event.keyCode == "13") {
    addtodo();
  }
});


theme.addEventListener("click", function(){


  document.body.classList.toggle("sunshine");
  display.classList.toggle("displayshow");
  displayshow.classList.toggle("display");
  displayspan.classList.toggle("displayshowspan");
  displayspan1.classList.toggle("display1")

})



document.addEventListener("DOMContentLoaded", function() {

  var savedTodos = localStorage.getItem("todos");

  if (savedTodos) {
    var todos = JSON.parse(savedTodos);

    todos.forEach(function(todo) {
      var p = createTodoElement(todo.text, todo.active, todo.checked);
      result.appendChild(p);
    });
  }
});

window.onbeforeunload = function() {
  updateLocalStorage();
};

function addtodo() {
  if (input.value != "") {
    var p = createTodoElement(input.value, false, false);
    result.appendChild(p);
    updateLocalStorage();
    input.value = "";
  }
}

function createTodoElement(text, active, checked) {
  var div = document.createElement("div");
  var p = document.createElement("p");
  var checkbox = document.createElement("input");

  div.classList.add("bgdiv");

  p.innerText = text;

  checkbox.type = "checkbox";
  checkbox.checked = checked;
  checkbox.classList.add("check");
  checkbox.addEventListener("change", handleCheckboxChange);


  div.appendChild(checkbox);
  div.appendChild(p);

  p.addEventListener("click", handleTodoClick);

  if (active) {
    div.classList.add("active"); 
  }

  return div;
}


function handleTodoClick(event) {
  var todo = event.target;
  todo.classList.toggle("active");
  updateLocalStorage();
}

function handleCheckboxChange(event) {
  updateLocalStorage();
}

function updateLocalStorage() {
  var todos = document.querySelectorAll("#result p");
  var todoData = [];

  todos.forEach(function(todo) {
    var checkbox = todo.querySelector("input[type=checkbox]");
    var todoItem = {
      text: todo.innerText,
      active: todo.classList.contains("active"),
      checked: checkbox ? checkbox.checked : false
    };
    todoData.push(todoItem);
  });

  localStorage.setItem("todos", JSON.stringify(todoData));
}

function deleteTodo(event) {
  var todo = event.target;
  todo.remove();
  updateLocalStorage();
}

function deleteCheckedTodos() {
  var checkboxes = document.querySelectorAll("#result input[type=checkbox]:checked");

  checkboxes.forEach(function(checkbox) {
    var div = checkbox.closest("div.bgdiv");
    div.remove();
  });

  updateLocalStorage();
}


btndelet.addEventListener("click", deleteCheckedTodos);
