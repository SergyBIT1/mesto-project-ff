const config = {
  baseUrl: 'https://nomoreparties.co/v1/pwff-cohort-1',
  headers: {
    authorization: 'ac6f0236-2a2d-48b5-b60c-04f463ba74ff',
    'Content-Type': 'application/json'
  }
}

const processResponse = (res) => {
  if(res.ok) {
    return res.json()
  }
  return error()
}

const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
  headers: config.headers
})
  .then(processResponse)
}

const getUsers = () => {
  return fetch(`${config.baseUrl}/users/me`, {
  headers: config.headers
})
  .then(processResponse)
}

const editProfile = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
  
  method: 'PATCH',
  headers:  config.headers,
  body: JSON.stringify({
    name: name,
    about: about,
})
  })
  .then(processResponse)
    
  //   (res => res.json())
  // .then((result) => {
  //   return result
  // });
}

const addNewCardByApi = (dataAddNewCard) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify( dataAddNewCard
    )
})
.then(processResponse)
}

export { getInitialCards, getUsers, editProfile, addNewCardByApi };