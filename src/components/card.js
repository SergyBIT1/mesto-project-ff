const cardTemplate = document.querySelector('#card-template').content;

// const objectsCreateCard = {
//   element,
//   deleteCard,
//   openCardImage,
//   clickLike
// }

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

function deleteCard(evt) {
  const evtTarget = evt.target.closest('.card');
  evtTarget.remove();
}

function clickLike(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

export {createCard, deleteCard, clickLike}