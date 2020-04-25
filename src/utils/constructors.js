export const dateParse = (date) => {
  if (typeof date === 'string') {
    return new Date(date.replace(/(\d{2})[.](\d{2})[.](\d+)/, '$2/$1/$3'))
  }
}

export const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
export const dayNames = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']