// ----variable-----------

var form = document.getElementById('add-frm');
var ntitle = document.getElementById('n-title');
var nbody = document.getElementById('n-body');
var items = document.getElementById('items');
var resetBtn = document.getElementById('reset');

var noteCount = 0;
var newNote = '';

var tableDiv = document.getElementById('tbl-div');

var search = document.getElementById('srch');

var isUpdate = false;
var record = '';
var note = '';
var body = '';

// ---Events---------

form.addEventListener('submit' , addNote);

//for page loads
window.onload = updateTable;

//for search
search.addEventListener('keyup', searchNotes);


// for remove
items.addEventListener('click', removeNote);

// for view and update
items.addEventListener('click', viewUpdateNote);

// for reset button
resetBtn.addEventListener('click',resetAll);


//--------------- functions

// Add Note

function addNote(e) {
 // stop initial behaviour 
    e.preventDefault();
   
 // validate inputs 
 if (ntitle.value=='' || nbody.value == ''){
    alert("Please fill all fields !");
 }
 else
    {
// create new note record

// New tr 
var tr = document.createElement('tr');
tr.className ='item';

//New td for title and body
var td1 = document.createElement('td');
td1.appendChild(document.createTextNode(ntitle.value));

var span = document.createElement('span');
span.className ="note-body";
span.appendChild(document.createTextNode(nbody.value));
td1.appendChild(span);


// New td for view
var td2 = document.createElement('td');
td2.className="btcellv";
var btn1= document.createElement('button');
btn1.appendChild(document.createTextNode('View'));
btn1.setAttribute('id','vw');
td2.appendChild(btn1);


// New td for delete
var td3 = document.createElement('td');
td3.className="btcelld";
var btn2= document.createElement('button');
btn2.appendChild(document.createTextNode('Delete'));
btn2.setAttribute('id','del');
td3.appendChild(btn2);


// Add all td to tr
tr.appendChild(td1);
tr.appendChild(td2);
tr.appendChild(td3);

// increment Note count 

noteCount++;

// set new note

newNote = tr;

//Add or update the note of the table
updateTable();

 }
 // reset all
 resetAll();
}


//update table
function updateTable(){
    //display the table when note get added
if (noteCount > 0){
    tableDiv.style.display = '';
    

    //update note
    if(isUpdate){
        note.firstChild.textContent = ntitle.value;
        note.lastChild.textContent = nbody.value;
        //reset update and note count
        isUpdate = false;
        noteCount--;
    }

    //add new note
    else{
        items.appendChild(newNote);
    }
}
else{
    tableDiv.style.display = 'none';
}
}

//search Notes

function searchNotes(e){
    //text to Lower case
    var searchTxt = e.target.value.toLowerCase();
   
    // Get List
    var list = items.getElementsByClassName('item');
    
    // covert to and array
    var listArr = Array.from(list);
    listArr.forEach(function(item){
        //get title
        var noteTitle = item.firstChild.textContent;
        //Match
        if(noteTitle.toLowerCase().indexOf(searchTxt) != -1){
            item.style.display='';
        }
        else{
            item.style.display = 'none';
        }
    });
}

//remove note

function removeNote(e){
  if(e.target.id === 'del'){
    if(confirm("are you sure?")){
        //delete notes
        var tr = e.target.parentElement.parentElement;
        items.removeChild(tr);

        //update table
        noteCount --;
        if(noteCount === 0){
            updateTable();
        }
    }
  }
}


//view adn update note

function viewUpdateNote(e){
    if(e.target.id === 'vw'){
        //get the element value and update input fields
        record = e.target.parentElement.parentElement;
        note = record.firstChild;
        ntitle.value  = note.firstChild.textContent; 
        nbody.value  = note.lastChild.textContent; 
        isUpdate = true;

    }
}

//reset all
function resetAll(){
    ntitle = '';
    nbody = '';
    isUpdate = false;
    newNote = '';
}



