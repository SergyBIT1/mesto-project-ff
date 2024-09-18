import '../pages/index.css';
import {createCard, deleteCard, clickLike, handleDeleteCard} from './card.js';
import {openPopup, closePopup} from './modal.js';
import {enableValidation, clearValidation, validationConfig} from './validation.js';
import {getInitialCards, getUsers, editProfile, addNewCardByApi, eraseCardByApi, addNewAvatar} from './api.js';

const placesList = document.querySelector('.places__list');
const popupImage = document.querySelector('.popup__image');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupTypeImageCuption = document.querySelector('.popup__caption');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const profileEdit = document.querySelector('.popup_type_edit');
const popupAddButton = document.querySelector('.profile__edit-button');
const cardPlaceList = document.querySelector('.places__list');
const formNewCard = document.forms['new-place'];
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardUrlInput = document.querySelector('.popup__input_type_url');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const addProfileButton = document.querySelector('.profile__add-button');
const popupCloseCross = document.querySelectorAll('.popup__close');
const titleInput = document.querySelector('.popup__input_type_name');
const descriptionInput = document.querySelector('.popup__input_type_description');
const formEditProfile = document.forms['edit-profile'];
const editProfileSaveBtn = formEditProfile.querySelector('.popup__button')
const formNewCardElement = document.forms['new-place']
const newCardSaveBtn = formNewCardElement.querySelector('.popup__button')
const popupChangeAvatar = document.querySelector('.popup_type_change-avatar'); 
const fieldTitle = document.querySelector('.profile__title');
const popupAvatarForm = popupChangeAvatar.querySelector('.popup__form');
const inputAvatarUrl = popupAvatarForm.querySelector('.popup__input_type_url');
const avatarSaveButton = popupAvatarForm.querySelector('.popup__button');
const fieldDescription = document.querySelector('.profile__description');
const editAvatar = document.querySelector('.profile__image');

let userId;

function getInitialData () {
  return Promise.all([getUsers(), getInitialCards()])
  .then(([userData, cardsData] ) => {
  console.log({userData, cardsData})

  userId = userData._id;
  profileTitle.textContent =  userData.name;
  profileDescription.textContent =  userData.about;
  profileImage.style.backgroundImage = `url(${userData.avatar})`;

  cardsData.forEach(dataset => {
    placesList.append(createCard(dataset, userId, deleteCard, openCardImage, clickLike, handleDeleteCard, openDeleteCardForm))
  }) 
  })
}

getInitialData ()

function openCardImage(event) {
  popupImage.src = event.target.src
  popupImage.alt = event.target.alt
  popupTypeImageCuption.textContent = event.target.alt
  openPopup(popupTypeImage)
};

// обработка открытия модального окна редактирования профиля
popupAddButton.addEventListener ('click', () => {  
  openPopup(profileEdit)
  titleInput.value = fieldTitle.textContent
  descriptionInput.value = fieldDescription.textContent
});

// обработка открытия модального окна добавления картинки нового места
addProfileButton.addEventListener ('click', () => {
  openPopup(popupTypeNewCard)
});

// обработка закрытия модального окна по крестику
popupCloseCross.forEach(evt => {
  const popup = evt.closest('.popup')
  evt.addEventListener('click', () => {
    closePopup(popup)
  })
});

editAvatar.addEventListener('click', () => {
  openPopup(popupChangeAvatar)
})

function openEditProfileForm() {
  titleInput.value = profileTitle;
  descriptionInput.value = profileDescription;
}

popupAvatarForm.addEventListener('submit', () => {
  changeBtnText(avatarSaveButton, true)
  addNewAvatar(inputAvatarUrl.value)
  .then((someUserData) => {
    editAvatar.style.backgroundImage = `url(${someUserData.avatar})`
    closePopup(popupChangeAvatar)
  })
  .catch((err) => {
    console.log(err)
  })

  .finally(() => {
    changeBtnText(avatarSaveButton, false)
  })
})

function changeBtnText (buttonElement, status) {
  buttonElement.textContent = status ? 'Сохранение...' : 'Сохранить'
}

//создание новой карточки
function createNewCard (evt) {
  evt.preventDefault(); 
  
  changeBtnText(newCardSaveBtn, true)
  const dataset = {
    name: cardNameInput.value,
    link: cardUrlInput.value,
  };

  addNewCardByApi(dataset)
  .then((dataset) => {
   
  const newPopupCard = createCard(dataset, userId, deleteCard,  openCardImage, clickLike, handleDeleteCard, openDeleteCardForm);
  cardPlaceList.prepend(newPopupCard)
  closePopup(popupTypeNewCard)
  evt.target.reset()
  })
  .catch((err) => {
    console.log(err)
  })

  .finally(() => {
    changeBtnText(newCardSaveBtn, false)
  })
};

formNewCard.addEventListener('submit', createNewCard);

function editProfileHandler (evt) {
  evt.preventDefault();
changeBtnText(editProfileSaveBtn, true)
  editProfile(titleInput.value, descriptionInput.value)
  .then((editUserDataset) => {
  fieldTitle.textContent = editUserDataset.name
  fieldDescription.textContent = editUserDataset.about
  evt.target.reset()  
  closePopup(profileEdit)
  })
  .catch((err) => {
    console.log(err)
  })

  .finally(() => {
    changeBtnText(editProfileSaveBtn, false)
  })
};
formEditProfile.addEventListener('submit', editProfileHandler);

function openDeleteCardForm(dataset, cardId) {
  
  const removeCardPopup = document.querySelector('.popup_type_remove-card');
   openPopup(removeCardPopup);

  removeButton.onclick = () => {
    eraseCardByApi(cardId)

    .then(() => {
      dataset.remove()
       closePopup(removeCardPopup)      
    })
 .catch((err) => {
      console.log(err)
    })
  }
}

enableValidation(validationConfig); 