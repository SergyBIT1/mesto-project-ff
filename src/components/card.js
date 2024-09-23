import { addLikeAndCount, deleteLike, eraseCardByApi } from "./api";
import { openPopup, closePopup } from "./index";

const cardTemplate = document.querySelector("#card-template").content;

function createCard(dataset, userId, deleteCard, openCardImage, clickLike) {
  const cardId = dataset._id;

  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardDelete = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  cardElement.querySelector(".card__image").src = dataset.link;
  cardElement.querySelector(".card__image").alt = dataset.name;
  cardElement.querySelector(".card__title").textContent = dataset.name;
  cardDelete.addEventListener("click", () => {
    deleteCard(cardElement, cardId);
  });

  likeButton.addEventListener("click", (evt) => {
    clickLike(evt, cardId, likeCardPlace);
  });

  const {
    name: cardName,
    link: cardLink,
    name: cardTitle,
    owner,
    likes,
  } = dataset;

  const isLiked = likes.some(({ _id }) => _id === userId);

  if (isLiked) {
    likeButton.classList.toggle("card__like-button_is-active");
  }

  const likeCardPlace = cardElement.querySelector(".card__like-button-count");

  likeCardPlace.textContent = dataset.likes.length;

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.addEventListener("click", openCardImage);

  if (dataset.owner._id !== userId) {
    cardDelete.remove();
  } else {
    cardDelete.addEventListener("click", () => {
      deleteCard(cardElement, cardId);
    });
  }

  return cardElement;
}
const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
const likeCardPlace = cardElement.querySelector(".card__like-button-count");

function clickLike(evt, cardId, likeCardPlace) {
  const likeAction = evt.target.classList.contains(
    "card__like-button_is-active"
  );
  const action = likeAction ? deleteLike(cardId) : addLikeAndCount(cardId);
  action
    .then((res) => {
      evt.target.classList.add("card__like-button_is-active");
      likeCardPlace.textContent = res.likes.length;
    })
    .catch((err) => console.log(err));
}

const removeCardPopup = document.querySelector(".popup_type_remove-card");
const removeButton = removeCardPopup.querySelector(".popup__button");

function deleteCard(dataset, cardId) {
  openPopup(removeCardPopup);

  removeButton.onclick = () => {
    eraseCardByApi(cardId)
      .then(() => {
        dataset.remove();
        closePopup(removeCardPopup);
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export { createCard, deleteCard, clickLike };
