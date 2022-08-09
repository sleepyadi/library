const openModalButtons = document.querySelectorAll('[data-target-modal]');
const closeModalButtons = document.querySelectorAll('[data-close-modal]');
const bookForm = document.querySelector('#form-add-book');
const container = document.querySelector('.book-container')

let myLibrary = [];

function openModal(modal) {
    modal.classList.add('active');
}

function closeModal(modal) {
    modal.classList.remove('active');
}

function Book(title, author, pages , hasRead, bookId) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
    this.bookId = bookId;
}

Book.prototype.read = function(bool) {
    this.hasRead = bool; 
}

function createBookCardElement(book) {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    bookCard.setAttribute('data-id', book.bookId);

    const bookTitle = document.createElement('h4');
    bookTitle.classList.add('book-card__title');
    bookTitle.textContent = book.title;

    const bookAuthor = document.createElement('p');
    bookAuthor.classList.add('book-card__author');
    bookAuthor.textContent = book.author;

    const bookPages = document.createElement('p');
    bookPages.classList.add('book-card__pages');
    bookPages.textContent = book.pages;



    const bookActions = document.createElement('div');
    bookActions.classList.add('book-card__actions')

    const bookRead = document.createElement('button');
    bookRead.textContent = book.hasRead;
    bookRead.classList.add('btn');
    bookRead.classList.add('book-card__read-btn');
    
    if (book.hasRead === 'Read') {
        bookRead.classList.add('btn-green')
    } else {
        bookRead.classList.add('btn-red');
    }

    bookActions.appendChild(bookRead);

    const bookDelete = document.createElement('button');
    bookDelete.textContent = 'Delete';
    bookDelete.classList.add('btn');
    bookDelete.classList.add('book-card__delete-btn');
    bookActions.appendChild(bookDelete);

    let items = [bookTitle, bookAuthor, bookPages, bookActions];
    items.forEach((item) => {
        bookCard.appendChild(item);
    })
    return bookCard;
}


function addBookToLibrary(containerNode, book) {
    let newBook = new Book(book.title.value,
                           book.author.value,
                           book.pages.value,
                           book.hasRead.value,
                           myLibrary.length
                           );
    
    myLibrary.push(newBook);
    
    containerNode.appendChild(createBookCardElement(newBook));
    
}

function deleteBook(bookElement) {
    if (!bookElement.getAttribute('class').includes('book-card')) {
        return;
    }

    const bookId = bookElement.getAttribute('data-id');
    bookElement.remove();
    delete myLibrary[bookId];
}

function editReadStatus(bookElement, readMsg, notReadMsg) {
    if (!bookElement.getAttribute('class').includes('book-card')) {
        console.log('Not book-card element');
        return;
    }

    const bookId = bookElement.getAttribute('data-id');
    const readBtn = bookElement.querySelector('.book-card__actions').firstChild;
    const readStatus = myLibrary[Number(bookId)].hasRead;

    if (!readBtn.getAttribute('class').includes('book-card__read-btn')) {
        console.log('Not read-btn element');
        return;
    }

    if (readStatus === readMsg) {
        myLibrary[Number(bookId)].hasRead = notReadMsg;
        readBtn.textContent = notReadMsg;
        readBtn.classList.remove('btn-green');
        readBtn.classList.add('btn-red');
    } else {
        myLibrary[Number(bookId)].hasRead = readMsg;
        readBtn.textContent = readMsg;
        readBtn.classList.remove('btn-red');
        readBtn.classList.add('btn-green');
    }

}

function clearForm(form) {

    let formElements = Array.from(form.elements);
    formElements.forEach((element) => {
        if (element.name !== 'hasRead') {
            element.value = '';
        }
        
    
    });
}


openModalButtons.forEach((button) => {

    button.addEventListener('click', () => {
        const modal = document.querySelector(button.getAttribute('data-target-modal'));
        openModal(modal);
    })
});

closeModalButtons.forEach((button) => {

    button.addEventListener('click', () => {
        const modal = document.querySelector(button.getAttribute('data-close-modal'));
        closeModal(modal);
    })
});


bookForm.addEventListener('submit', (event) => {
    // preventing form to submit
    event.preventDefault();

    const bookData = bookForm.elements;
    addBookToLibrary(container, bookData);
    clearForm(bookForm);

    const formModal = bookForm.parentNode;
    closeModal(formModal);
});


container.addEventListener('click', (event) => {

    if (event.target.nodeName === 'BUTTON') {
        const className = event.target.getAttribute('class');
        const cardClass = event.target.parentNode.parentNode ;

        if (className.includes('book-card__delete-btn')) {
            deleteBook(cardClass);
        }

        if (className.includes('book-card__read-btn')) {
            editReadStatus(cardClass, 'Read', 'Not Read');
        }

    }
})

