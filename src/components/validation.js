import { validationConfig } from './index.js';

const formElement = document.querySelector('.popup__form');
const formInput = formElement.querySelector('.popup__input');

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add('popup_input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__error_visible');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove('popup_input_type_error');
  errorElement.classList.remove('popup__error_visible');
  errorElement.textContent = '';
};

const isValid = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) { 
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } 
  else {
    inputElement.setCustomValidity('');
  }
  
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } 
  else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      isValid(formElement, inputElement);
    });
  });
};

setEventListeners(formElement);

const enableValidation = (validationConfig) => {

  const formList = Array.from(document.querySelectorAll('.popup__form'));
  
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (event) {
      event.preventDefault()
    });
    setEventListeners(formElement, validationConfig);
  });
};

export {enableValidation};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add('form__submit_inactive')
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove('form__submit_inactive');
  }
}