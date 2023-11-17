const taskInput = document.querySelector(".task-input input"),
    filters = document.querySelectorAll(".filters span"),
    clearAll = document.querySelector(".clear-btn"),
    taskBox = document.querySelector(".task-box");

let editId,
    isEditTask = false,todos;
//---------DUMMY DATA----------------
//    ,todos = JSON.parse(localStorage.getItem("todo-list")) || []; // Assuming todos is an array or null _ || []
//    todos.push({ name: "Test Task", status: "pending", date: "2023-11-10", });
//    localStorage.setItem("todo-list", JSON.stringify(todos));
//--------------------------------------------------------


//----------------------------------------------------------------
filters.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector("span.active").classList.remove
            ("active");
        btn.classList.add("active");
        showTodo(btn.id);
    });
});

//----------------------------------------------------------------
function editTask(taskId, textName) {
editId = taskId;
isEditTask = true;
taskInput.value = textName;
taskInput.focus();
taskInput.classList.add("active");
}
//----------------------------------------------------------------
async function deleteTask(deleteId, filter) {
isEditTask = false;
//todos.splice(deleteId, 1);
//localStorage.setItem("todo-list", JSON.stringify(todos));


try {
    const response = await fetch('/deleteTodo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: deleteId }),
    });
    if (response.ok) {
        window.location.href = response.url;
    } else {
        console.error('Error adding task:', response.statusText);// Handle error response
    }
} catch (error) {
    console.error('Network error:', error);
}



showTodo(filter);
}
//----------------------------------------------------------------



//£££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££
    //---------DATABASE DATA----------------

//Now pass the data to ejs from there send the ejs data to js file.
async function fetchTodos() {
    try {
        //console.log('Fetching todos from logic.js...');
        const response = await fetch('/api/todos');
        const todoss = await response.json();
        todos = todoss;
        //console.log(todoss);

//£££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££
        //Here only you can find todoss in an array format, outside its sent a promise.      

        showTodo("all");
 //------------- showTodo is a core function ---------------------





//----------------------------------------------------------------



//£££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££
} catch (error) {
    console.error('Error fetching todos', error);
    // If there's an error, you might want to throw it or return a default value
    throw error; // You can choose to throw the error
    // return []; // Or return a default value (an empty array, for example)
}
}

fetchTodos();
//---------DATABASE DATA  END----------------
//£££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££££




/*clearAll.addEventListener("click", () => {  // Clear All Button is hidden in CSS
    isEditTask = false;
    todos.splice(0, todos.length);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo();
});//*/


//----------------------------------------------------------------
//----------------------------------------------------------------
    function showMenu(selectedTask) {
    let menuDiv = selectedTask.parentElement.lastElementChild;
    menuDiv.classList.add("show");
    document.addEventListener("click", e => {
        if (e.target.tagName != "I" || e.target != selectedTask) {
            menuDiv.classList.remove("show");
        }
    });
    }
    
//----------------------------------------------------------------
//----------------------------------------------------------------
async function updateStatus(selectedTask) {
    console.log(selectedTask);
    let taskName = selectedTask.parentElement.lastElementChild;
    //console.log(todos[selectedTask.id].status);
    if (selectedTask.checked) {
        taskName.classList.add("checked");
        selectedTask.class = "completed"; //todos[selectedTask.id].status = "completed";
        //NOTE :: could not used TODO here as it is only in the above block accesible.
    } else {
        taskName.classList.remove("checked");
        selectedTask.class = "pending"
    }
    //localStorage.setItem("todo-list", JSON.stringify(todos))
    try {
        const response = await fetch('/statusUpdate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: selectedTask.class, id : selectedTask.id  }),
        });
        if (response.ok) {
            window.location.href = response.url;
        } else {
            console.error('Error adding task:', response.statusText);// Handle error response
        }
    } catch (error) {
        console.error('Network error:', error);
    }
    
    //*/
    }


//----------------------------------------------------------------
//----------------------------------------------------------------



taskInput.addEventListener("keyup", async (e) => {
    let userTask = taskInput.value.trim();
    const currentDate = new Date();
    const formattedDate =formatDate(currentDate.toISOString().split('T')[0]); // Output: "2023-11-10" (example date)

    if (e.key == "Enter" && userTask) {
        if (!isEditTask) {
            try {
                const response = await fetch('/addTask', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({name: userTask, status: "pending" ,date: formattedDate }),
                });

                if (response.ok) {
                    //const result = await response.json();
                    //console.log(result); 
                    window.location.href = response.url;
                } else {
                    // Handle error response
                    console.error('Error adding task:', response.statusText);
                }
            } catch (error) {
                // Handle network errors
                console.error('Network error:', error);
            }
        } else {
            try {
                const response = await fetch('/updateTask', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id: editId, name: userTask,status:"pending" ,date: formattedDate}),
                });

                if (response.ok) {
                    //const result = await response.json();
                    // Handle the result if needed
                    //console.log(result);
                    window.location.href = response.url;
                } else {
                    // Handle error response
                    console.error('Error updating task:', response.statusText);
                }
            } catch (error) {
                // Handle network errors
                console.error('Network error:', error);
            }

            isEditTask = false;
            todos[editId].name = userTask;
        }
           // */
        taskInput.value = "";
        //showTodo(document.querySelector("span.active").id);
    }
});



//---------






// Helper function to format date
function formatDate(dateString) {
    if (!dateString) {
        return ""; // Handle empty or undefined date
    }
   // const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
        return "Invalid date";
    }
    //return date.toLocaleDateString(undefined, options);}
    const day = date.getDate();
    const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
    const year = date.getFullYear();

    return `${day} ${month} ${year} `;
}

//¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
//¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬
    // showTodo is a core function
    function showTodo(filter) { //we need arrray in format name status data
        let liTag = "";
        if (todos) {
            todos.forEach((todo, id) => {
                let completed = todo.status == "completed" ? "checked" : "";
                if (filter == todo.status || filter == "all") {
    
                    //const currentDate = new Date();
                    const formattedDate =todo.date; //currentDate.toISOString().split('T')[0]; // Output: "2023-11-10" (example date)
                  
                    liTag +=
                        `
                <li class ="task">
    
                    <label for ="${todo.id}">
                    <input onclick ="updateStatus(this)" 
                    type= "checkbox" id = "${todo.id}" class = "${todo.status}"  ${completed}>               
                    <p id ="date" class = "${completed}">${formatDate(formattedDate)}</p>
                            
                    <p class = "${completed}">${todo.name}</p>
                    </label>
                

                    <div class = "settings" >
                        <i onclick= "showMenu(this)" class= "uil
                         uil-ellipsis-h"></i>
    
                        <ul class = "task-menu">
                         <li onclick='editTask(${todo.id},"${todo.
                            name}")'>
                             <i class = "uil uil-pen"></i> 
                         Edit </li>
                          <li onclick='deleteTask(${todo.id},"${filter}")'>
                           <i class = "uil uil-trash"></i>
                           Delete
                           </li>
                        </ul>
                    </div>
                                      
                </li> `;
                }
            });
        }
    
        taskBox.innerHTML = liTag || `<span>You don't have any task here</span>`;
        let checkTask = taskBox.querySelectorAll(".task");
        !checkTask.length ? clearAll.classList.remove("active")
            : clearAll.classList.add("active");
          taskBox.offsetHeight >= 280 ? taskBox.classList.add("overflow")
              : taskBox.classList.remove("overflow");
    
    } //showTodo function




/*/ Helper function to format time
function formatTime(timeString) {
    const options = { hour: 'numeric', minute: 'numeric', hour12: false };
    const time = new Date(`2000-01-01T${timeString}`);
    return time.toLocaleTimeString(undefined, options);
}
// <!--<p class="task-time">${formatTime(todo.time)}</p>-->*/





/*/<!-- JavaScript to handle modal functionality -->

  // function openModal() {
     document.body.classList.add('modal-open');
     document.getElementById('pinModal').style.display = 'flex';
   }///

  function closeModal() {
    document.body.classList.remove('modal-open');
    document.getElementById('pinModal').style.display = 'none';
  }

  function authenticatePin() {
    // Add logic to authenticate the PIN
    const enteredPin = document.getElementById('pin').value;
    const correctPin = '1234'; // Replace with your correct PIN    process.env.LOCAL_USER

    if (enteredPin === correctPin) {
      // If PIN is correct, close the modal and show the protected content
      closeModal();
      return true; // Allow the form submission
    } else {
      // If PIN is incorrect, prevent the form submission
      alert('Incorrect PIN. Please try again.');
      return false;
    }
  }*/

  // modalLogic.js

// Function to check if the modal should be displayed from Middleware
/*const shouldDisplayModal = () => {
    // Use the query parameter from the URL to determine if the modal should be displayed
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('modalNotDisplayed') !== 'true';
  };*/ //Commented Because function is removed from this to render pass method
  
  // Function to display or hide the modal based on the logic
  const updateModalVisibility = () => {
    const modal = document.getElementById('pinModal');
  
    if (shouldDisplayModal()) {
      // Display the modal
      modal.style.display = 'flex';
    } else {
      // Hide the modal
      modal.style.display = 'none';
    }
  };
  
  /*/ Event listener to close the modal
  document.getElementById('closeModal').addEventListener('click', () => {
    const modal = document.getElementById('pinModal');
    modal.style.display = 'none';
  });*/
  
  // Initial update when the page loads
  updateModalVisibility();
  