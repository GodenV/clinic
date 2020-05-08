import {HTTP} from "./http";

export const getCustomer = (userId) => {
  return new Promise((resolve, reject) => {
    return HTTP.get(`/customers/?userId=${userId}`)
      .then(response => ((response.status === 200) ? resolve : reject)(response))
      .catch(error => reject(error.response))
  })
}

export const createMedicalCard = (customerId, model) => {
  return new Promise((resolve, reject) => {
    return HTTP.post(`/customers/${customerId}/card`, model)
      .then(response => ((response.status === 20) ? resolve : reject)(response))
      .catch(error => reject(error.response))
  })
}

export const updateCustomer = (id, model) => {
  return new Promise((resolve, reject) => {
    return HTTP.put(`/customers/${id}`, model)
      .then(response => ((response.status === 200) ? resolve : reject)(response))
      .catch(error => reject(error.response))
  })
}

export const createCustomer = (model) => {
  return new Promise((resolve, reject) => {
    return HTTP.post(`/customers`, model)
      .then(response => ((response.status === 201) ? resolve : reject)(response))
      .catch(error => reject(error.response))
  })
}



