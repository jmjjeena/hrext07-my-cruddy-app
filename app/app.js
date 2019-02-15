/*
Init app
interact with DOM
interact with localstorage

 */

let allNotes = [];

let Note = function(text){
  this.id = Date.now();
  this.text = text;
  this.timeStamp= Date(Date.now()).split(" GMT")[0];
};

let initialize = function() {
  // console.log(allNotes);
  allNotes = getLocalStorage();
  if (allNotes) {
    showNotes(allNotes);
  }
    addEventListeners();
};

let addEventListeners = function() {
  //add submit event listener
  $('form').on('submit', function(e) {
    handleAddClick(e);
  });

  //add delete event listener
  $('.delete-button').on('click', function(e) {
    handleDeleteClick(e);
  });
};

let getLocalStorage = function() {
  console.log("ar")
  //check to see if nmdNotes exist
  //if it does, call showNotes function
  let storageNotes = localStorage.getItem("nmdNotes");
  if (storageNotes != null && storageNotes != "") {
    storageNotes = JSON.parse(storageNotes);
    return storageNotes;
  } else {
    return null;
  }
};

let saveToLocalStorage = function(notes) {
  allNotes = notes;
  localStorage.setItem("nmdNotes", JSON.stringify(notes));
  initialize();
  
};

let handleAddClick = function(e) {
  e.preventDefault();

  var form = document.querySelector("form");
  let input = form[0].value;

  if (input) {
    let newNote = new Note(input);
    let nmdNotes = getLocalStorage();

    if (nmdNotes) {
      nmdNotes.push(newNote);
    } else { 
      nmdNotes = [];
      nmdNotes.push(newNote);
    }
    saveToLocalStorage(nmdNotes);
  }

  form.reset();
};

let showNotes = function(notesArray) {
  //get all entries and clear
  $('#all-entries').empty()
  //add notes to dom
  //get element by ID of notes parent container
  notesArray.forEach(function(entry) {
    addNoteToNmdNotes(entry);
  });
};

let addNoteToNmdNotes = function(entry) {
  let entryElement = `<div class = "nmd-container"> 
                        <ul>
                          <li id="${entry.id}" class = "note note-text-date">
                              <p class="flex note-text">${entry.text}</p>
                              <p class="flex time-text">${entry.timeStamp}</p>
                            </div>
                            <button class="delete-button" data-noteid=${entry.id}>Delete</button>
                            </li>
                        </ul>
                      </div>`
  $('#all-entries').prepend(entryElement);
};

let addNotetoAllEntries = function() {
  //get notes container 
  //prepend note to container
};

let handleDeleteClick = function(e) {
  e.preventDefault();
  //get note ID
  let noteid = Number(e.target.dataset.noteid);
  //call deleteNote with note id
  deleteNote(noteid);
};

let deleteNote = function(noteID) {
  //get note element with ID, remove it from DOM
  //remove note from local storage

  let newNotes = allNotes.filter(function(note){
    return note.id !== noteID;
  })
  // console.log("after: ",newNotes);

  saveToLocalStorage(newNotes);
  initialize();
};

$(document).ready(initialize);
