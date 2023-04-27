const input = document.querySelector('input')
const button = document.querySelector('button')
const cityName = document.querySelector('.city-name')
const warning = document.querySelector('.warning')
const photo = document.querySelector('.photo')
const weather = document.querySelector('.weather')
const temperature = document.querySelector('.temperature')
const humidity = document.querySelector('.humidity')

const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q='
const API_LINK2 = '&appid='
const API_UNITS = '&units=metric'


const getWeather = () => {
  const city = input.value || 'Warsaw'
  const URL = API_LINK + city + API_LINK2 + API_KEY + API_UNITS

  axios.get(URL).then(res => {
    const temp = res.data.main.temp
    const humid = res.data.main.humidity
    const conditions = res.data.weather[0]
    const icon = conditions.id.toString().charAt(0)

    cityName.textContent = `${res.data.name}, ${res.data.sys.country}`
    temperature.textContent = Math.floor(temp) + '°C'
    humidity.textContent = humid + '%'
    weather.textContent = conditions.description

    warning.textContent = ''
    input.value = ''

    if (conditions.id === 800) {
      photo.setAttribute('src', './img/sun.png')
    } else if (icon === 2) {
      photo.setAttribute('src', './img/thunderstorm.png')
    } else if (icon === 3) {
      photo.setAttribute('src', './img/drizzle.png')
    } else if (icon === 5) {
      photo.setAttribute('src', './img/rain.png')
    } else if (icon === 6) {
      photo.setAttribute('src', './img/ice.png')
    } else if (icon === 7) {
      photo.setAttribute('src', './img/fog.png')
    } else if (icon === 8 && !conditions.id === 800) {
      photo.setAttribute('src', './img/cloud.png')
    } else {
      photo.setAttribute('src', './img/unknown.png')
    }
  })
  .catch(() => warning.textContent = 'Enter correct city name')
}

const enterCheck = (e) => {
  if (e.key === 'Enter') {
    getWeather()
  }
}

getWeather()
button.addEventListener('click', getWeather)
input.addEventListener('keyup', enterCheck)
