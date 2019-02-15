/*
Init app
interact with DOM
interact with localstorage

 */

let allNotes = []

let Note = function(text){
  this.id = Date.now();
  this.text = text;
  this.timeStamp= Date(Date.now());
}

let initialize = function(){
  console.log(allNotes)
  allNotes = getLocalStorage();
  if (allNotes) {
    showNotes(allNotes);
  }
    addEventListeners();
}

let addEventListeners = function() {
  //add submit event listener
  $('form').on('submit', function(e){
    handleAddClick(e)}
  );

  //add delete event listener
  $('#delete').on('click', function(e){
    handleDeleteClick(e);
  })
}

let getLocalStorage = function() {
  console.log("ar")
  //check to see if nmdNotes exist
  //if it does, call showNotes function
  let storageNotes = localStorage.getItem("nmdNotes");
  if (storageNotes != null && storageNotes != "") {
    storageNotes = JSON.parse(storageNotes);
    return storageNotes
  } else {
    return null
  }
}

let saveToLocalStorage = function(notes) {
  allNotes = notes;
  localStorage.setItem("nmdNotes", JSON.stringify(notes));
  initialize();
  
}

let handleAddClick = function(e) {
  e.preventDefault();

  var form = document.querySelector("form");
  let input = form[0].value;

  if (input){
    let newNote = new Note(input);
    let nmdNotes = getLocalStorage();

    if (nmdNotes) {
      nmdNotes.push(newNote);
    } else { 
      nmdNotes = [];
      nmdNotes.push(newNote)
    }
    saveToLocalStorage(nmdNotes)
  }

  form.reset();
}

let showNotes = function(notesArray) {
  //get all entries and clear
  $('#all-entries').empty()
  //add notes to dom
  //get element by ID of notes parent container
  notesArray.forEach(function(entry){
    addNoteToNmdNotes(entry)
  })
}

let addNoteToNmdNotes = function(entry){
  let entryElement = `<div id="${entry.id}" class = "note"><h1 class="flex note_text">${entry.text}</h1><h5 class="flex">${entry.timeStamp}</h5> <button class="flex" id="delete" data-noteid=${entry.id}>Delete</button></div>`
  $('#all-entries').prepend(entryElement)
}

let addNotetoAllEntries = function(){
  //get notes container 
  //prepend note to container
}

let handleDeleteClick = function(e){
  e.preventDefault();
  //get note ID
  let noteid = Number(e.target.dataset.noteid);
  //call deleteNote with note id
  deleteNote(noteid)
}

let deleteNote = function(noteID){
  //get note element with ID, remove it from DOM
  //remove note from local storage

  let newNotes = allNotes.filter(function(note){
    return note.id !== noteID;
  })
  console.log("after: ",newNotes)

  saveToLocalStorage(newNotes);
  initialize();
}

$(document).ready(initialize)


// // Set up a local storage
// $(document).ready(function(){
//     // First time the page loads, It loads initial content stored
//     // Then this saves the above data structure into the Local Storage.
//     // Local Storage: NO LONGER EMPTY
//   })

// // --------------------
// // ADD DATA
// // --------------------

// // add the first post to the entries container
// // click on the entry-button 
// // clear inputs on click of 'add' button
// // make 'add' generate unique key (id) for each entry and get rid of the 'key' input
// // it should be added the entries container in a box shape 
// // which should have a time stamp and date
// // added that to database -  local stroge
// // 'add' function should include
//         // entry
//         // edit button
//         // delete button
// // re-arrange the UI



//   $('.entry-button').on('click', function(e){
//     e.preventDefault();
//     console.log(e);
//     var keyData = Date.now()
//     var valueData = $('.input-text').val();

//     if(valueData) {
//       $('.input-text').val('');
//     // write to db
//     localStorage.setItem(keyData, valueData);
//     // read from db
//     $('.entries').append(`<div <p class="display-data-item" data-key-value="` + keyData +
//                          `"><span class="item">` + valueData +
//                          `</span><span class="item-buttons"><button class="edit" id="` + keyData +
//                          `">Edit</button><button class="delete" id="` + keyData +
//                          `">Delete</button></span></div>`);
//   }
//     // var displayText = keyData + ' | ' + localStorage.getItem(keyData);
//     // // this only displays the last one? might want to switch to html
//     // // and append a div
//     // // <div class="display-data-item" data-keyValue="keyData">valueData</div>
//     // // if you use backticks ` you can use ${templateLiterals}
//     // // TODO make this vars make sense across the app
//     // $('.container-data').html('<div class="display-data-item" data-keyValue="'+ keyData +'">'+valueData+'</div>');
//     // $('.input-key').val('');
//     // $('.input-value').val('');
//   });


//   // update db
//     // need to expand when  more than 1 item is added

//   // delete item
//   $('.container-data').on('click', '.display-data-item', function(e){
//     console.log(e.currentTarget.dataset.keyvalue);
//     var keyData = e.currentTarget.dataset.keyvalue;
//     localStorage.removeItem(keyData);
//     $('.container-data').text('');
//   })
//   // delete all?
//   $('.btn-clear').click(function(){
//     localStorage.clear();
//     $('.container-data').text('');
//   });
