import { addLikeAndCount, deleteLike } from "./api";

const cardTemplate = document.querySelector('#card-template').content;

function createCard(dataset, userId, deleteCard, openCardImage, clickLike) {
  
  const cardId = dataset._id;

  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardDelete = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  cardElement.querySelector('.card__image').src = dataset.link;
  cardElement.querySelector('.card__image').alt = dataset.name;
  cardElement.querySelector('.card__title').textContent = dataset.name;
  cardDelete.addEventListener('click', deleteCard);
  likeButton.addEventListener('click', clickLike);
  
  const likeCardPlace = cardElement.querySelector('.card__like-button-count')

  likeCardPlace.textContent = dataset.likes.length

  const cardImage = cardElement.querySelector('.card__image')
  cardImage.addEventListener('click',  
    openCardImage)

  return cardElement;
};

function deleteCard(evt) {
  const evtTarget = evt.target.closest('.card');
  evtTarget.remove();
}

function clickLike(evt, cardId, likeCardPlace) {
  const likeButton = evt.target;
  const likeAction = likeButton.classList.contains('card__like-button_is-active') ? deleteLike : addLikeAndCount;
  likeAction(cardId)
  .then ((res) => {
    likeButton.classList.add('card__like-button_is-active') 
    likeCardPlace.textContent = res.likes.length 

    // const countLikes =  evt.target.classList.add('card__like-button-count')
    // countLikes.textContent = res.likes.length
  }) 
  .catch(err => console.log(err));
}

export {createCard, deleteCard, clickLike}