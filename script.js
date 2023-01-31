function openPopup() {
  document.querySelector(".popup").style.display = "block";
}

function closePopup() {
  document.querySelector(".popup").style.display = "none";
}

function IDGenerator() {
  return (Math.round(Math.random()*10000000000))
}

const submit = document.getElementById("submit")
const authorInput = document.getElementById("author")
const titleInput = document.getElementById("title")
const pagesInput = document.getElementById("pages")
const readInput = document.getElementById("read")
const shelf = document.querySelector(".shelf")
const selectForm = document.getElementById("book-status-form");

let myLibrary = []

function Book(author, title, pages, status) {
  this.author = author,
  this.title = title,
  this.pages = pages,
  this.status = status
  this.id = IDGenerator()
}

function addBookToLibrary() {
  submit.addEventListener('click', () => {
    event.preventDefault()
    const bookDetails = new Book(authorInput.value, titleInput.value, pagesInput.value, selectForm.value);
    myLibrary.push(bookDetails)
    console.table(myLibrary)

    displayBooks();
    closePopup();
  })
}

function displayBooks() {
  shelf.innerHTML = " "
  for (let i=0; i < myLibrary.length; i++) {
    identifier = myLibrary[i].id
    shelf.innerHTML += 
    "<div class='card'>" 
    + "<div class='main'>" 
      + "<div class='author'>" + "<b>" + "Author: " + "</b>" + myLibrary[i].author + "</div>"
      + "<div class='title'>" + "<b>" + "Title: " + "</b>" + myLibrary[i].title + "</div>"
      + "<div class='pages'>" + "<b>" + "Number of Pages: " + "</b>" + myLibrary[i].pages + "</div>"
      + "<div class='read'>" + "<b>" + "Status: " + "</b>" + myLibrary[i].status + "</div>" 
    + "</div>"

    + "<div class='buttons'>"
      + "<button class='delete'" + "data-id =" + identifier + "> Delete </button>" 
      + "<button class='read-book'" + "data-id =" + identifier + "> Change Status </button>" 
    + "</div>" +
    "</div>" 
    DeleteBook()
    changeStatus()
  } 
}

function DeleteBook() {
  const deleteButton = document.querySelectorAll(".delete");
  deleteButton.forEach(del => {
    del.addEventListener('click', (e) => {
      const dataid = +e.target.getAttribute("data-id")
      console.log(dataid)
      myLibrary = myLibrary.filter((myLibrary) => myLibrary.id !== dataid);
      console.table(myLibrary)

      displayBooks();
    })
  })
}

function changeStatus() {
  const statusButton = document.querySelectorAll(".read-book")
  statusButton.forEach(status => {
    status.addEventListener('click', (e) => {
      const statusid = +e.target.getAttribute("data-id")
      
      myLibrary = myLibrary.map(myLibrary => {
        if (statusid === myLibrary.id && myLibrary.status === "Not Read") {
          myLibrary.status = "Read"
        } else if (statusid === myLibrary.id && myLibrary.status === "Read") {
          myLibrary.status = "Not Read"
        }
        return myLibrary
      })
      displayBooks();
    })
  })
}

addBookToLibrary();