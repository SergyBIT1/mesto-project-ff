


const formElement = document.querySelector('.popup__form');
const formInput = formElement.querySelector('.popup__input');
const formError = formElement.querySelector(`.${formInput.id}-error`);

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('name__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove('name__input_type_error');
  errorElement.classList.remove('name__input-error_active');
  errorElement.textContent = '';
};

const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  inputList.forEach((input) => {
    inputElement.addEventListener('input', function () {
      isValid(formElement, input);
    });
  });
};

setEventListeners(formElement);

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  inputList.forEach((input) => {
    formElement.addEventListener('submit', function (event) {
      event.preventDefault()
    });
    setEventListeners(formElement);
  });
};

// enableValidation();

export {enableValidation};