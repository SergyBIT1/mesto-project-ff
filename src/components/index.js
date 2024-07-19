import '../pages/index.css';
import initialCards from './cards.js';
import {openPopup, closePopup} from './modal.js';


const cardTemplate = document.querySelector('#card-template').content;

const placesList = document.querySelector('.places__list');

function createCard(element, deleteCard, openCardImage) {
  
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardDelete = cardElement.querySelector('.card__delete-button');
  cardElement.querySelector('.card__image').src = element.link;
  cardElement.querySelector('.card__image').alt = element.name;
  cardElement.querySelector('.card__title').textContent = element.name;
  cardDelete.addEventListener('click', deleteCard);

  const cardImage = cardElement.querySelector('.card__image')
  cardImage.addEventListener('click',  
    openCardImage)

  return cardElement;
};

const popupImage = document.querySelector('.popup__image')
const popupTypeImage = document.querySelector('.popup_type_image')
const popupTypeImageCuption = document.querySelector('.popup__caption')

function openCardImage(event) {
  popupImage.src = event.target.src
  popupImage.alt = event.target.alt
  popupTypeImageCuption.textContent = event.target.alt
  openPopup(popupTypeImage)
}

function deleteCard(evt) {
  const evtTarget = evt.target.closest('.card');
  evtTarget.remove();
}

initialCards.forEach(element => {
  placesList.append(createCard(element, deleteCard, openCardImage) )
});

// обработка открытия модального окна редактирования профиля
const profileEdit = document.querySelector('.popup_type_edit');
const popupAddButton = document.querySelector('.profile__edit-button');

popupAddButton.addEventListener ('click', () => {
  openPopup(profileEdit)
})

// обработка открытия модального окна добавления картинки нового места
const PopupTypeNewCard = document.querySelector('.popup_type_new-card');
const addProfileButton = document.querySelector('.profile__add-button');

addProfileButton.addEventListener ('click', () => {
  openPopup(PopupTypeNewCard)
})

// обработка закрытия модального окна по крестику
const popupCloseCross = document.querySelectorAll('.popup__close')

popupCloseCross.forEach(evt => {
  const popup = evt.closest('.popup')
  evt.addEventListener('click', () => {
    closePopup(popup)
  })
})

const cardPlaceList = document.querySelector('.places__list')
const formNewCardElement = document.forms['new-place']
const cardNameInput = document.querySelector('.popup__input_type_card-name')
const cardInpurUrl = document.querySelector('.popup__input_type_url')

function crateNewCard (evt) {
  evt.preventDefault(); 

  const element = {
    name: cardNameInput.value,
    link: cardInpurUrl.value,
  }

  const newPopupCard = createCard(element, deleteCard,  openCardImage)

  cardPlaceList.prepend(newPopupCard)
  closePopup(PopupTypeNewCard)
  evt.target.reset()
}

formNewCardElement.addEventListener('submit', crateNewCard)