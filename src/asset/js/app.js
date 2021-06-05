document.addEventListener("DOMContentLoaded", function (event) {
  class App {
    constructor(name) {
      // Initialize
      this.taskInput = document.getElementById("new-task");
      this.addButton = document.getElementById("add-button");
      this.incompleteTasksHolder = document.getElementById("incomplete-tasks");
      this.completedTasksHolder = document.getElementById("completed-tasks");
      this.taskInput.focus();
      this.addButton.addEventListener("click", this.addTask.bind(this));
      
      // Init Tasks for to-do list
      let toDoTaskNames = this.getTaskLocalStorage('toDoTaskName', ['Pay Bills', 'Go Shopping'])
      this.createNewTaskElements(toDoTaskNames, this.incompleteTasksHolder, this.taskCompleted);
      
      // Init Tasks for completed list 
      let completedTaskNames = this.getTaskLocalStorage('completedTaskName', ['See the Doctor']) 
      this.createNewTaskElements(completedTaskNames, this.completedTasksHolder, this.taskIncomplete);      
    }


    /***           Task List METHODS           ***/
    //  Task List methods to create task/s elements. Other methods are for event handlers
    //  that can add, edit, delete and move tasks in add, todo and completed list
    
    createNewTaskElement(taskString) {
      let listItem = document.createElement("li");
      
      listItem.innerHTML += `<input type="checkbox" tabindex="0" aria-checked="false">
       <label tabindex="0">${taskString}</label>
       <input tabindex="0" type="text" class="editTask" required />
       <button tabindex="0" type="button" class="edit" aria-pressed="false">Edit</button>
       <button tabindex="0" type="button" class="delete" aria-pressed="false" >Delete</button>`
       
      return listItem;
    }

    createNewTaskElements(taskNames, loc, checkBoxEventHandler){
      for (let i = 0; i < taskNames.length; i++){
        let listItem = this.createNewTaskElement(taskNames[i]);
        loc.appendChild(listItem)
        
        // binds all the task events for the li tag
        this.bindTaskEvents(listItem, checkBoxEventHandler.bind(this))
      }
    }
    
    addTask(e) {
      let form = document.forms[0];
      let listItemName = form.querySelector('input[name="new-task"]');
      
      // Focuses and exits the function when add task input is empty 
      if (listItemName.value == "") {
        listItemName.focus()  
        return false;
      }
      
      // Saves task to to-do list in local storage, updates to-do list 
      // and associated event handlers
      this.saveTaskLocalStorage('toDoTaskName', listItemName.value)
      let listItem = this.createNewTaskElement(listItemName.value);
      this.incompleteTasksHolder.appendChild(listItem);
      this.bindTaskEvents(listItem, this.taskCompleted.bind(this));
      document.getElementById("addForm").reset()
      e.preventDefault()
    }
    
    editTask(e) {
      const listItem = e.srcElement.parentNode;
      const ul    = listItem.parentNode;
      const uid = ul.id;
      let editInput = listItem.querySelectorAll("input[type=text")[0];
      let label = listItem.querySelector("label");
      let button = listItem.getElementsByTagName("button")[0];
      let containsClass = listItem.classList.contains("editMode");
      if (containsClass) {
        // When Save Button is clicked
        if (editInput.value){
          // Updates local storage details  
          if (uid === 'incomplete-tasks'){
              this.updateTaskLocalStorage('toDoTaskName', label.innerText, editInput.value);
          }
          else if (uid === 'completed-tasks'){
              this.updateTaskLocalStorage('completedTaskName', label.innerText, editInput.value);
          }
          
          label.innerText = editInput.value;
          button.innerText = "Edit";
          listItem.classList.toggle("editMode");
          editInput.classList.remove('input-error');
        }
        else{
            editInput.classList.add('input-error');
        }
      } else {
        // When Edit Button is clicked
        editInput.value = label.innerText;
        button.innerText = "Save";
        listItem.classList.toggle("editMode");
        editInput.focus();  
      }
    }
    
    deleteTask(e) {
      const listItem  = e.srcElement.parentNode;
      const label     = listItem.querySelector('label')
      const ul        = listItem.parentNode;
      const labelText = label.innerText;
      const uid = ul.id;
      
      // Deletes from local storage and removes from element
      if (uid === 'incomplete-tasks'){
        this.removeTaskLocalStorage('toDoTaskName', labelText);  
      }
      else if (uid === 'completed-tasks'){
        this.removeTaskLocalStorage('completedTaskName', labelText);  
      }
      ul.removeChild(listItem);
    }
    
    //  taskCompleted and taskIncomplete methods are  
    //  designated eventHandlers for checkbox
    taskCompleted(el) {
      let listItem = el.target.parentNode;
      let label = listItem.querySelector("label");
      
      this.removeTaskLocalStorage('toDoTaskName', label.innerText);
      this.saveTaskLocalStorage('completedTaskName', label.innerText);
      
      let chkbx = listItem.querySelector('input[type="checkbox"]');
      chkbx.checked = false;
      this.completedTasksHolder.appendChild(listItem);
      this.bindTaskEvents(listItem, this.taskIncomplete.bind(this));
      
    }
    
    taskIncomplete(el) {
      let listItem = el.target.parentNode;
      let label = listItem.querySelector("label");
      this.saveTaskLocalStorage('toDoTaskName', label.innerText);
      this.removeTaskLocalStorage('completedTaskName', label.innerText);
      let chkbx = listItem.querySelector('input[type="checkbox"]');
      chkbx.checked = false;
      this.incompleteTasksHolder.appendChild(listItem);
      this.bindTaskEvents(listItem, this.taskCompleted.bind(this));
    }
    
    bindTaskEvents(taskListItem, checkBoxEventHandler) {
      let checkBox = taskListItem.querySelectorAll("input[type=checkbox]")[0];
      let editButton = taskListItem.querySelectorAll("button.edit")[0];
      let deleteButton = taskListItem.querySelectorAll("button.delete")[0];
      editButton.onclick = this.editTask.bind(this);
      deleteButton.onclick = this.deleteTask.bind(this);
      checkBox.onchange = checkBoxEventHandler;
    }
    
    /***           LOCAL STORAGE METHODS           ***/
    // Local storage methods to get, save and 
    // remove tasks in todo and completed list
    getTaskLocalStorage(key, taskNames){
      if (localStorage.getItem(key) === null) {
        localStorage.setItem(key, JSON.stringify(taskNames));
      } else {
        taskNames = JSON.parse(localStorage.getItem(key));
      }
      return taskNames;
    }
    
    saveTaskLocalStorage(key, value){
      let taskNames;
      if(localStorage.getItem(key) === null){
        taskNames = [];
      }else{
        taskNames = JSON.parse(localStorage.getItem(key));
      }
      taskNames.push(value);
      localStorage.setItem(key, JSON.stringify(taskNames));
    }
    
    removeTaskLocalStorage(key, value){
      // remove the element only once
      let taskNames;
      if(localStorage.getItem(key) === null){
        taskNames = [];
      }else{
        taskNames = JSON.parse(localStorage.getItem(key));
      }
      
      let index = taskNames.indexOf(value);
      if (index > -1) {
        taskNames.splice(index, 1);
      }
      localStorage.setItem(key, JSON.stringify(taskNames));
    }
    
    updateTaskLocalStorage(key, prevVal, newVal){
        this.removeTaskLocalStorage(key, prevVal);
        this.saveTaskLocalStorage(key, newVal);
    }
        
  }
  let myApp = new App("");
});
