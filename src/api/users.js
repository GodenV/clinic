import {HTTP} from "./http";

export const getUsers = () => {
  return new Promise((resolve, reject) => {
    return HTTP.get(`/users/`)
      .then(response => ((response.status === 200) ? resolve : reject)(response))
      .catch(error => reject(error.response))
  })
}

export const getUser = (id) => {
  return new Promise((resolve, reject) => {
    return HTTP.get(`/users/${id}/`)
      .then(response => ((response.status === 200) ? resolve : reject)(response))
      .catch(error => reject(error.response))
  })
}

export const updateUser = (id, model) => {
  return new Promise((resolve, reject) => {
    return HTTP.put(`/users/${id}/`, model)
      .then(response => ((response.status === 200) ? resolve : reject)(response))
      .catch(error => reject(error.response))
  })
}

export const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    return HTTP.delete(`/users/${id}/`)
      .then(response => ((response.status === 200) ? resolve : reject)(response))
      .catch(error => reject(error.response))
  })
}
export const createUser = (model) => {
  return new Promise((resolve, reject) => {
    return HTTP.post(`/users/`, model)
      .then(response => ((response.status === 201) ? resolve : reject)(response))
      .catch(error => reject(error.response))
  })
}


