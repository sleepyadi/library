const openModalButtons = document.querySelectorAll('[data-target-modal]');
const closeModalButtons = document.querySelectorAll('[data-close-modal]');
const bookForm = document.querySelector('#form-add-book');

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
    this.hasRead = read;
    this.bookId = bookId;
}

Book.prototype.read = function(bool) {
    this.hasRead = bool; 
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
})


bookForm.addEventListener('submit', (event) => {
    // preventing form to submit
    event.preventDefault();


})