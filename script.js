function Book(author, title, pages, read, index){
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
}

const myLibrary = [];

function addBookToLibrary(author, title, pages,read){
    let newBook = new Book(author,title,pages,read,myLibrary.length);
    myLibrary.push(newBook);
}
const bookGridDiv = document.querySelector(".books")
function displayBooks(){
    myLibrary.forEach((book)=>{
        let card = document.createElement("div");
        card.innerHTML = `
        <h2>"${book.title}"</h2>
        <h2>${book.author}</h2>
        <h2>${book.pages} pages</h2>
        <button class = "read"></button>
        <button class = "remove">Remove</button>
        `;
        let readButton = card.querySelector(".read");
        if(book.read===false){
            readButton.innerText = "not read";
            readButton.style.backgroundColor = "#FF474C";
        } else {
            readButton.innerText = "read";
            readButton.style.backgroundColor = "#90EE90";
        }
        readButton.addEventListener('click',()=>{
            if(readButton.innerText==="not read"){
                readButton.innerText = "read";
            readButton.style.backgroundColor = "#90EE90";
            } else {
                readButton.innerText = "not read";
                readButton.style.backgroundColor = "#FF474C";
            }
        });
        let removeButton = card.querySelector(".remove");
        removeButton.addEventListener('click',()=>{
            let index = Array.from(bookGridDiv).indexOf(card);
            myLibrary.splice(index,1);
            bookGridDiv.innerHTML = "";
            displayBooks();
        });

        card.classList.add("card");
        bookGridDiv.appendChild(card);
    });
}

const modal = document.querySelector('#modal');
const openModal = document.querySelector('.add-book');

openModal.addEventListener('click',() =>{
    modal.showModal();
});

const submit = document.getElementById("submit-button")
submit.addEventListener('click',()=>{
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const number=  document.getElementById("number").value;
    const isRead = document.getElementById("checkbox").checked;
    if(!title||!author||!number||!isRead){
        alert("Please fill out all fields");
        return;
    }
    addBookToLibrary(author,title,number,isRead);
    bookGridDiv.innerHTML = "";
    displayBooks()
});