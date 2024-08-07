const openPopup = (popup) => {
  popup.classList.add('popup_is-opened')
  popup.classList.add('popup_is-animated')
  document.addEventListener('keydown', closeEsc)
  popup.addEventListener('click', closeCross)
}

const closePopup = (popup) => {
  popup.classList.remove('popup_is-opened')
  document.removeEventListener('keydown', closeEsc)
  popup.removeEventListener('click', closeCross)
}

const closeEsc = (event) => {
  const openedPopup = document.querySelector('.popup_is-opened');
  if (event.key === 'Escape')  {
    closePopup(openedPopup)
  }
} 

const closeCross = (event) => {
  if (event.target === event.currentTarget)  {
    closePopup(event.currentTarget)
  }
} 

export {openPopup, closePopup};