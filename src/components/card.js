import { addLikeAndCount, deleteLike, eraseCardByApi } from "./api";
// import { openPopup, closePopup } from "./modal";

const cardTemplate = document.querySelector('#card-template').content;

function createCard(dataset, userId, deleteCard, openCardImage, clickLike) {
  
  const cardId = dataset._id;

  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardDelete = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  cardElement.querySelector('.card__image').src = dataset.link;
  cardElement.querySelector('.card__image').alt = dataset.name;
  cardElement.querySelector('.card__title').textContent = dataset.name;
  cardDelete.addEventListener('click', () => {
    deleteCard(cardElement, cardId)})
  likeButton.addEventListener('click', (evt) => {
    clickLike(evt, cardId)})
  
  const likeCardPlace = cardElement.querySelector('.card__like-button-count')

  likeCardPlace.textContent = dataset.likes.length

  const cardImage = cardElement.querySelector('.card__image')
  cardImage.addEventListener('click',  
    openCardImage)

    if (dataset.owner._id !== userId) {
      cardDelete.remove();
    } else {
      cardDelete.addEventListener('click', () => {
        deleteCard(cardElement, cardId);
      });
    }

    if (dataset.owner._id !== userId) {
      likeCardPlace.remove();
    } else {
      likeCardPlace.addEventListener('click', () => {
        deleteCard(cardElement, cardId);
      });
    }

  return cardElement;
};

function deleteCard() {
  const removeCardPopup = document.querySelector('.popup_type_remove-card');
  removeCardPopup.querySelector('.popup__button');
}

function clickLike(evt, cardId) {
  const likeAction = evt.target.classList.contains('card__like-button_is-active') 
  const action = likeAction ? deleteLike(cardId) : addLikeAndCount(cardId);
  action
  .then ((res) => {
    evt.target.classList.toggle('card__like-button_is-active', !likeAction);
    evt.target
    .closest('.places__item') 
    .querySelector('.card__like-button-count').textContent = res.likes.length 
  }) 
  .catch(err => console.log(err));
}

const handleDeleteCard = (dataset, cardElement) => {
  deleteCard(dataset.owner._id).then(() => {
    cardElement.remove();
  })
}

export {createCard, deleteCard, clickLike, handleDeleteCard}