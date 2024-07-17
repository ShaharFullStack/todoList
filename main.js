const taskInput = document.getElementById("task");
const taskDateInput = document.getElementById("taskDate");
const container = document.getElementById("container");

let notes = [];

function add() {
    const task = taskInput.value;
    const taskDate = taskDateInput.value;
    const note = {task, taskDate}
    if (validation()) {
        notes.push(note);
        saveNotes();
        displayNotes(notes);
        // clearFields();
    }
}

function validation() {
    if (!taskInput.value){
        alert("Write a task")
        focus.taskInput;
        return false;
    }
    if (!taskDateInput.value){
        alert("Set the date")
        focus.taskDateInput;
        return false;
    }
    return true;
}

function loadNotes() {
    const json = localStorage.getItem("notes")
    if (!json) 
        return;
    notes = JSON.parse(json);
    displayNotes(notes);
}

function displayNotes(notes) {
    let html = "<section>";
    for (const note of notes) {
        html += `<div class="note"><ul>
                    <button class="btn2" onclick="removeNote('${note.task}', '${note.taskDate}')">
                    ❌</button><li>${note.task}</li><li style="color: red;">${note.taskDate}</li></ul></div>`;
    }
    container.innerHTML = html;
}

function removeNote(task, taskDate) {
    const index = notes.findIndex(note => note.task === task && note.taskDate === taskDate);
    if (index > -1) {
        notes.splice(index, 1);
        saveNotes();
        displayNotes(notes);
    }
}

function clearFields() {
    taskInput.value = "";
    taskDateInput.value = "";
}

function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(notes));
}

document.addEventListener("DOMContentLoaded", loadNotes);