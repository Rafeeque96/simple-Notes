let notesData = JSON.parse(localStorage.getItem("myNotes")) || []
let newNotesButton = document.querySelector(".notesNew")
let notesModal = document.querySelector(".notesModal")
let  notesForm = document.querySelector(".notesForm")
let closeForm = document.querySelector(".closeForm")
let notesList = document.querySelector(".notesList")

// Open Modal

newNotesButton.addEventListener("click",function(){
    notesModal.classList.add("active") 
})

//Hide Modal

closeForm.addEventListener("click",function(){
    notesModal.classList.remove("active")
})

// Handle note form

notesForm.addEventListener("submit",function(e){
    e.preventDefault()
    // Handle notes data
    let title = e.target.noteTitle.value
    let content = e.target.noteEntry.value
    let noteObj = createNoteObj(title,content)
    notesData.push(noteObj)
    localStorage.setItem("myNotes", JSON.stringify(notesData))

    // Handle notes ui with data created
    populateNotes(notesData)
    notesModal.classList.remove("active")
    // console.log(notesData)
    e.target.reset()
})

function populateNotes(notesData){
    let allNotes = notesData.map(function(note){
        return `
        <div class="notesItem">
        <h2>${note.title}</h2>
        <p>${note.content}</p>
        <div class="notesMeta">
          <button class="notesDelete" data-id="${note.id}"> <img src="/assets/trash.svg" height="12" alt=""> Delete</button>
        </div>
      </div>
        `
    }).join("")

    notesList.innerHTML = allNotes
    // console.log(allNotes)
}

 populateNotes(notesData)

// Create obj function

function createNoteObj(title,content){
    let newNote = {
        title: title,
        content: content,
        id: crypto.randomUUID()
    }
    return newNote
}

document.addEventListener("click",function(e){
    //  console.dir(e.target)
    if(e.target.classList.contains("notesDelete")){
    // console.log("Delete button clicked")
    let id = e.target.dataset.id
    // console.log(id)
    
    let shouldDelete = confirm("Are you sure to delete this note?")
    
    if(shouldDelete){
        
    notesData = notesData.filter(function(note){
        return note.id !== id
    })
    localStorage.setItem("myNotes",JSON.stringify(notesData))
    populateNotes(notesData)  
    }
   }
}) 