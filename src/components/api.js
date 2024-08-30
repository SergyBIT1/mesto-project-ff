const config = {
  baseUrl: 'https://nomoreparties.co/v1/pwff-cohort-1',
  headers: {
    authorization: 'ac6f0236-2a2d-48b5-b60c-04f463ba74ff',
    'Content-Type': 'application/json'
  }
}

const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
  headers: config.headers
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  });
}

const getUsers = () => {
  return fetch(`${config.baseUrl}/users/me`, {
  headers: config.headers
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  });
}

export { getInitialCards, getUsers };