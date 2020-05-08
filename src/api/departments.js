import {HTTP} from "./http";

export const getDepartments = () => {
  return new Promise((resolve, reject) => {
    return HTTP.get(`/departments`)
      .then(response => ((response.status === 200) ? resolve : reject)(response))
      .catch(error => reject(error.response))
  })
}

export const updateDepartment = (id, model) => {
  return new Promise((resolve, reject) => {
    return HTTP.put(`/departments/${id}/`, model)
      .then(response => ((response.status === 200) ? resolve : reject)(response))
      .catch(error => reject(error.response))
  })
}

export const deleteDepartment = (id) => {
  return new Promise((resolve, reject) => {
    return HTTP.delete(`/departments/${id}/`)
      .then(response => ((response.status === 200) ? resolve : reject)(response))
      .catch(error => reject(error.response))
  })
}
export const createDepartment = (model) => {
  return new Promise((resolve, reject) => {
    return HTTP.post(`/departments/`, model)
      .then(response => ((response.status === 201) ? resolve : reject)(response))
      .catch(error => reject(error.response))
  })
}

export const addDepartmentPhoto = (id, model) => {
  return new Promise((resolve, reject) => {
    return HTTP.post(`/departments/${id}/photo`, model)
      .then(response => ((response.status === 200) ? resolve : reject)(response))
      .catch(error => reject(error.response))
  })
}

