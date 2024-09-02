import '../pages/index.css';
// import initialCards from './cards.js';
import {createCard, deleteCard, clickLike} from './card.js';
import {openPopup, closePopup} from './modal.js';
import {enableValidation, clearValidation} from './validation.js';
import {getInitialCards, getUsers, editProfile} from './api.js';

const placesList = document.querySelector('.places__list');
const popupImage = document.querySelector('.popup__image');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupTypeImageCuption = document.querySelector('.popup__caption');

const profileTitle = document.querySelector('.profile__title')

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// новый вывод карточек

let userId;

function getUserAndCardsInfo () {
  return Promise.all([getUsers(), getInitialCards()])
  .then(([userData, cardsData] ) => {
  console.log({userData, cardsData})

  profileTitle.textContent =  userData.name;

  cardsData.forEach(element => {
    placesList.append(createCard(element, userId, deleteCard, openCardImage, clickLike))
  }) 
  })
}

getUserAndCardsInfo ()

function openCardImage(event) {
  popupImage.src = event.target.src
  popupImage.alt = event.target.alt
  popupTypeImageCuption.textContent = event.target.alt
  openPopup(popupTypeImage)
};

// старый вывод карточек

// initialCards.forEach(element => {
//   placesList.append(createCard(element, deleteCard, openCardImage, clickLike) )
// });

// обработка открытия модального окна редактирования профиля
const profileEdit = document.querySelector('.popup_type_edit');
const popupAddButton = document.querySelector('.profile__edit-button');

popupAddButton.addEventListener ('click', () => {  
  openPopup(profileEdit)
  titleInput.value = fieldTitle.textContent
  descriptionInput.value = fieldDescription.textContent
});

// обработка открытия модального окна добавления картинки нового места
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const addProfileButton = document.querySelector('.profile__add-button');

addProfileButton.addEventListener ('click', () => {
  openPopup(popupTypeNewCard)
});

// обработка закрытия модального окна по крестику
const popupCloseCross = document.querySelectorAll('.popup__close');

popupCloseCross.forEach(evt => {
  const popup = evt.closest('.popup')
  evt.addEventListener('click', () => {
    closePopup(popup)
  })
});

//создание новой карточки
const cardPlaceList = document.querySelector('.places__list');
const formNewCard = document.forms['new-place'];
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardUrlInput = document.querySelector('.popup__input_type_url');

function crateNewCard (evt) {
  evt.preventDefault(); 

  const element = {
    name: cardNameInput.value,
    link: cardUrlInput.value,
  };

  const newPopupCard = createCard(element, userId, deleteCard,  openCardImage, clickLike);
  cardPlaceList.prepend(newPopupCard)
  closePopup(popupTypeNewCard)
  evt.target.reset()
};
formNewCard.addEventListener('submit', crateNewCard)

// редактирование профиля
const titleInput = document.querySelector('.popup__input_type_name');
const descriptionInput = document.querySelector('.popup__input_type_description');
const formEditProfile = document.forms['edit-profile'];

// элементы, куда должны быть вставлены значения полей
const fieldTitle = document.querySelector('.profile__title');
const fieldDescription = document.querySelector('.profile__description');

function editProfileHeader (evt) {
  evt.preventDefault();

  editProfile(titleInput.value, descriptionInput.value)

  .then((dataset) => {
  fieldTitle.textContent = dataset.name
  fieldDescription.textContent = dataset.description
  evt.target.reset()  
  closePopup(profileEdit)
  })
};
formEditProfile.addEventListener('submit', editProfileHeader);

enableValidation(validationConfig); 

export { validationConfig };