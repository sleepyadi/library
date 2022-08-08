const openModalButtons = document.querySelectorAll('[data-target-modal]');
const closeModalButtons = document.querySelectorAll('[data-close-modal]');
const bookForm = document.querySelector('#form-add-book');


function openModal(modal) {
    modal.classList.add('active');
}

function closeModal(modal) {
    modal.classList.remove('active');
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
