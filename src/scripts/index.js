import '../pages/index.css';

import initialCards from './cards.js'

// import  from './src/images/card_1.jpg';

// import logo from '../images/logo.svg';
// const logo = new URL('../images/logo.svg', import.meta.url);

// const whoIsTheGoat = [
//   { name: 'logo', link: logo },
// ];

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






 