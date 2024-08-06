import '../pages/index.css';
import initialCards from './cards.js';
import {openPopup, closePopup} from './modal.js';

const cardTemplate = document.querySelector('#card-template').content;

const placesList = document.querySelector('.places__list');

function createCard(element, deleteCard, openCardImage, clickLike) {
  
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardDelete = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  cardElement.querySelector('.card__image').src = element.link;
  cardElement.querySelector('.card__image').alt = element.name;
  cardElement.querySelector('.card__title').textContent = element.name;
  cardDelete.addEventListener('click', deleteCard);
  likeButton.addEventListener('click', clickLike);

  const cardImage = cardElement.querySelector('.card__image')
  cardImage.addEventListener('click',  
    openCardImage)

  return cardElement;
};

function clickLike(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

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
  placesList.append(createCard(element, deleteCard, openCardImage, clickLike) )
});

// обработка открытия модального окна редактирования профиля
const profileEdit = document.querySelector('.popup_type_edit');
const popupAddButton = document.querySelector('.profile__edit-button');

popupAddButton.addEventListener ('click', () => {  
  openPopup(profileEdit)
  titleInput.value = fieldTitle.textContent
  descriptionInput.value = fieldDescription.textContent
})

// обработка открытия модального окна добавления картинки нового места
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const addProfileButton = document.querySelector('.profile__add-button');

addProfileButton.addEventListener ('click', () => {
  openPopup(popupTypeNewCard)
})

// обработка закрытия модального окна по крестику
const popupCloseCross = document.querySelectorAll('.popup__close')

popupCloseCross.forEach(evt => {
  const popup = evt.closest('.popup')
  evt.addEventListener('click', () => {
    closePopup(popup)
  })
})

//создание новой карточки
const cardPlaceList = document.querySelector('.places__list')
const formNewCard = document.forms['new-place']
const cardNameInput = document.querySelector('.popup__input_type_card-name')
const cardUrlInput = document.querySelector('.popup__input_type_url')

function crateNewCard (evt) {
  evt.preventDefault(); 

  const element = {
    name: cardNameInput.value,
    link: cardUrlInput.value,
  }

  const newPopupCard = createCard(element, deleteCard,  openCardImage, clickLike)
  cardPlaceList.prepend(newPopupCard)
  closePopup(popupTypeNewCard)
  evt.target.reset()
}
formNewCard.addEventListener('submit', crateNewCard)

// редактирование профиля
const titleInput = document.querySelector('.popup__input_type_name')
const descriptionInput = document.querySelector('.popup__input_type_description')
const formEditProfile = document.forms['edit-profile']

// элементы, куда должны быть вставлены значения полей
const fieldTitle = document.querySelector('.profile__title')
const fieldDescription = document.querySelector('.profile__description')

function editCard (evt) {
  evt.preventDefault();
  fieldTitle.textContent = titleInput.value
  fieldDescription.textContent = descriptionInput.value
  evt.target.reset()  
  closePopup(profileEdit)
}
formEditProfile.addEventListener('submit', editCard);