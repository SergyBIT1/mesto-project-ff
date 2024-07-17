
// получаю элемент
const profileEdit = document.querySelector('.popup_type_edit');

// нажатие на кнопку
const profileEditButton = document.querySelector('.profile__edit-button');

const openPopup = (popup) => {
  popup.classList.add('popup_is-opened')
  document.addEventListener('keydown', handleCloseEsc)
  document.addEventListener('click', modalWindowClose)
}

// обработка открытия модального окна
document.addEventListener ('click', () => {
  openPopup(profileEdit)
})

