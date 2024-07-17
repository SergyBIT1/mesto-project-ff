export {openPopup};




// нажатие на кнопку
const profileEditButton = document.querySelector('.profile__edit-button');

const openPopup = (popup) => {
  popup.classList.add('popup_is-opened')
  document.addEventListener('keydown', closeEsc)
}

const closePopup = (popup) => {
  popup.classList.remove('popup_is-opened')
  document.removeEventListener('keydown', closeEsc)
}

const closeEsc = (event) => {
  const openedPopup = document.querySelector('.popup_is-opened');
  if (event.key === 'Escape') {
    closePopup(openedPopup)
  }
  
} 