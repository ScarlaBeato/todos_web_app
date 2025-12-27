//Retreive todo from local storage or initialize an empty array
let todo = JSON.parse(localStorage.getItem('todo')) || [];

const todoInput = document.getElementById('todoInput');

console.log(todoInput);
const todoList = document.getElementById('todoList');
const todoCount = document.getElementById('todoCount');
const addTodoButton = document.querySelector('.btn');
const deleteButton = document.getElementById('deleteButton');

//Initialize

document.addEventListener('DOMContentLoaded', function() {
    addTodoButton.addEventListener ('click', addTask);
    todoInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
           event.preventDefault();
            addTask();  
        }
    });
    deleteButton.addEventListener('click', deleteAllTasks);
    displayTasks(); //This will show all the tasks done or no done that are currently in the local storage
});


//This function will add the new task to the tasks list and will save it to local storage, this will only add non empty tasks.
function addTask() {
  try {
    const newTask = todoInput.value.trim();
    if (!newTask) {
      alert("Por favor, escribe una tarea antes de agregarla.");
      return;
    }
    todo.push({ text: newTask, disabled: false });
    SaveToLocalStorage();
    todoInput.value = "";
    displayTasks();
  } catch (error) {
    console.error("Error al agregar tarea:", error);
  }
}

//This function will delete all the tasks from the list and from the local storage in one click
 function deleteAllTasks() {
  localStorage.removeItem('todo');
  todo = [];
  displayTasks();
}

// This function will display all the tasks in the list, it will create the elements needed for each task and will add the corresponding event listeners for each action (edit, delete, toggle)
function displayTasks() {
  todoList.innerHTML = ""; // this cleans the list before redrawing it to avoid duplicating the tasks on the list

  //this creates an element on the list for each task in the todo array
  todo.forEach((item, index) => {
    const li = document.createElement("li");
    li.classList.add("todoContainer");

    // This constant will create a checkbox for each task
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = item.disabled;
    checkbox.addEventListener("change", () => toggleTask(index));

    // This constant will create the text for each task so it can be seen and edited if needed
    const text = document.createElement("p");
    text.textContent = item.text;
    text.className = item.disabled ? "disabled" : "";
    text.addEventListener("click", () => editTask(index));

    // This constant will create the delete button for each task so we can delete them individually
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", () => deleteTask(index));

    // This will append all the created elements to the list item and then to the todo list
    li.appendChild(checkbox);
    li.appendChild(text);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
  });
}


// This function will save the current state of the todo array to local storage
  function SaveToLocalStorage() {
    localStorage.setItem('todo', JSON.stringify(todo));
  }

  // This function will allow editing a task when its text is clicked
  function editTask(index) {
    const newText = prompt("Edita la tarea:");
  if (newText !== null && newText.trim() !== "") {
    todo[index].text = newText.trim();
    SaveToLocalStorage();
    displayTasks();
  }      
}

// This function will toggle the disabled status of a task when its checkbox is clicked
function toggleTask(index) {
  // Cchange the disabled status of the task
  todo[index].disabled = !todo[index].disabled;

  // this saves the new status to local storage
  SaveToLocalStorage();

  // Updates the interface to reflect the change
  displayTasks();
}

// This function will delete a specific task from the list and from local storage
function deleteTask(index) {
  try {
    //erase the task from the todo array
    todo.splice(index, 1);

    //updates localstorage with the new array state
    SaveToLocalStorage();

    // refresh the task list display
    displayTasks();

  } catch (error) {
    console.error("Error al eliminar la tarea:", error); //this message will pop-up on the screen if we try to add an empty task
  }
}

