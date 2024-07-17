import '../pages/index.css';
import initialCards from './cards.js';
import {openPopup} from './modal.js';

const cardTemplate = document.querySelector('#card-template').content;

const placesList = document.querySelector('.places__list');

function createCard(element, deleteCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardDelete = cardElement.querySelector('.card__delete-button');
  cardElement.querySelector('.card__image').src = element.link;
  cardElement.querySelector('.card__image').alt = element.name;
  cardElement.querySelector('.card__title').textContent = element.name;
  cardDelete.addEventListener('click', deleteCard);

  return cardElement;
};

function deleteCard(evt) {
  const evtTarget = evt.target.closest('.card');
  evtTarget.remove();
}

initialCards.forEach(element => {
  placesList.append(createCard(element, deleteCard) )
});




// получаю элемент
const profileEdit = document.querySelector('.popup_type_edit');

const popupAddButton = document.querySelector(".profile__edit-button");

// обработка открытия модального окна
popupAddButton.addEventListener ('click', () => {
  openPopup(profileEdit)
})





 