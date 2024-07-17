export {openPopup};




// нажатие на кнопку
const profileEditButton = document.querySelector('.profile__edit-button');

const openPopup = (popup) => {
  popup.classList.add('popup_is-opened')
  // document.addEventListener('keydown', handleCloseEsc)
  // document.addEventListener('click', modalWindowClose)
}


