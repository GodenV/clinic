import {HTTP} from "./http";

export const getDoctors = () => {
  return new Promise((resolve, reject) => {
    return HTTP.get(`/doctors`)
      .then(response => ((response.status === 200) ? resolve : reject)(response))
      .catch(error => reject(error.response))
  })
}

export const updateDoctor = (id, model) => {
  return new Promise((resolve, reject) => {
    return HTTP.put(`/doctors/${id}`, model)
      .then(response => ((response.status === 200) ? resolve : reject)(response))
      .catch(error => reject(error.response))
  })
}

export const deleteDoctor = (id) => {
  return new Promise((resolve, reject) => {
    return HTTP.delete(`/doctors/${id}`)
      .then(response => ((response.status === 200) ? resolve : reject)(response))
      .catch(error => reject(error.response))
  })
}
export const createDoctor = (model) => {
  return new Promise((resolve, reject) => {
    return HTTP.post(`/doctors`, model)
      .then(response => ((response.status === 201) ? resolve : reject)(response))
      .catch(error => reject(error.response))
  })
}

export const addDoctorPhoto = (id, model) => {
  return new Promise((resolve, reject) => {
    return HTTP.post(`/doctors/${id}/photo`, model)
      .then(response => ((response.status === 200) ? resolve : reject)(response))
      .catch(error => reject(error.response))
  })
}

