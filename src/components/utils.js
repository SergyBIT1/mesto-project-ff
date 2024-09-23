function changeBtnText(buttonElement, status) {
  buttonElement.textContent = status ? "Сохранение..." : "Сохранить";
}

export { changeBtnText }