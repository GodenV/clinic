import { HTTP } from './http'

export const requestLogin = (model) => {
  return new Promise((resolve, reject) => {
    return HTTP.post(`/auth/login`, model)
      .then(response => {
        return ((response.status === 200) ? resolve : reject)(response)
      })
      .catch(error => reject(error.response))
  })
}

export const requestSignup = (model) => {
  return new Promise((resolve, reject) => {
    return HTTP.post(`/auth/register`, model)
      .then(response => {
        return ((response.status === 201) ? resolve : reject)(response)
      })
      .catch(error => reject(error.response))
  })
}

export const requestCurrentUser = () => {
  return new Promise((resolve, reject) => {
    return HTTP.get(`/users/me`)
      .then(response => ((response.status === 200) ? resolve : reject)(response))
      .catch(error => reject(error.response))
  })
}