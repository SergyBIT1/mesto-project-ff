// enableValidation


// включение валидации вызовом enableValidation
// все настройки передаются при вызове

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});


// clearValidation


// очистка ошибок валидации вызовом clearValidation

// clearValidation(profileForm, validationConfig);





const formElement = document.querySelector('.form');
const formInput = formElement.querySelector('.form__input');
const formError = formElement.querySelector(`.${formInput.id}-error`);

const showInputError = (formElement, errorMessage) => {
  formElement.classList.add('form__input_type_error');
  formError.textContent = errorMessage;
  formError.classList.add('form__input-error_active');
};

const hideInputError = (formElement) => {
  formElement.classList.remove('form__input_type_error');
  formError.classList.remove('form__input-error_active');
  formError.textContent = '';
};

const isValid = (formElement) => {
  if (!formInput.validity.valid) {
    showInputError(formInput, formInput.validationMessage);
  } else {
    hideInputError(formInput);
  }
};

formInput.addEventListener('input', isValid);