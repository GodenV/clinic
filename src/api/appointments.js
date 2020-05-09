import {HTTP} from "./http";

export const getAppointments = (doctorId, date) => {
  return new Promise((resolve, reject) => {
    return HTTP.get(`doctors/${doctorId}/appointments?date=${date}`)
      .then(response => ((response.status === 200) ? resolve : reject)(response))
      .catch(error => reject(error.response))
  })
}

export const createAppointments = (model) => {
  return new Promise((resolve, reject) => {
    return HTTP.post(`/appointments`, model)
      .then(response => ((response.status === 201) ? resolve : reject)(response))
      .catch(error => reject(error.response))
  })
}