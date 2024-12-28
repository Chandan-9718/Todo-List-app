// Selecting the input field and add button
let input = document.getElementById("input");

// Fetching existing todos from localStorage or initializing an empty array
let data = JSON.parse(localStorage.getItem("alltodo")) || [];

// Function to display all todos on the page
function displaytodo() {
  document.getElementById("AllTodo").innerHTML = ""; // Clear the todo container
  data.forEach((singletodo, id) => {
    todostructure(singletodo, id); // Create and append each todo item
  });
}

// Function to create the structure of a single todo item
function todostructure(singletodo, id) {
  let div = document.createElement("div");
  div.setAttribute("class", "singletodo");

  // Adding the todo content, checkbox, and remove button
  div.innerHTML = `
    <h2 class="${singletodo.completed ? "completed" : ""}">${singletodo.text}</h2>
    <input type="checkbox" ${singletodo.completed ? "checked" : ""} />
    <button>Remove Todo</button>
  `;

  // Adding event listener to the remove button
  let btn = div.getElementsByTagName("button")[0];
  btn.addEventListener("click", () => {
    removetodo(id); // Remove the specific todo
  });

  // Adding event listener to toggle the completed class
  let inp = div.getElementsByTagName("input")[0];
  inp.addEventListener("click", (e) => {
    // Toggle the completed state in the data array
    data[id].completed = e.target.checked;
    localStorage.setItem("alltodo", JSON.stringify(data)); // Update localStorage
    e.target.previousElementSibling.classList.toggle("completed");
  });

  // Appending the todo item to the container
  document.getElementById("AllTodo").appendChild(div);
}

// Adding a new todo on button click
document.getElementById("Addbtn").addEventListener("click", (e) => {
  e.preventDefault();

  if (!input.value.trim()) { // Check if input is empty
    alert("Aapne koi data nahi dala hai."); // Alert the user
    return;
  }

  let todoinput = input.value.trim(); // Get the trimmed value of the input field
  if (todoinput) {
    data.push({ text: todoinput, completed: false }); // Add the new todo to the array with a default 'completed' state
    localStorage.setItem("alltodo", JSON.stringify(data)); // Save to localStorage
    displaytodo(); // Refresh the displayed todos
    input.value = ""; // Clear the input field
  }
});

// Function to remove a todo by its id
function removetodo(id) {
  data.splice(id, 1); // Remove the todo from the array
  localStorage.setItem("alltodo", JSON.stringify(data)); // Update localStorage
  displaytodo(); // Refresh the displayed todos
}

// Initial display of todos on page load
displaytodo();
