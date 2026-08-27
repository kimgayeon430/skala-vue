import axios from 'axios'

// 화면에서 사용하는 도시 ID와 OpenWeatherMap 요청 좌표를 한곳에서 관리합니다.
export const CITY_LOCATIONS = [
  { id: 'city_01', name: '서울', lat: 37.5665, lon: 126.978 },
  { id: 'city_02', name: '수원', lat: 37.2636, lon: 127.0286 },
  { id: 'city_03', name: '부산', lat: 35.1796, lon: 129.0756 },
  { id: 'city_04', name: '제주', lat: 33.4996, lon: 126.5312 },
]

const weatherClient = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  timeout: 10000,
})

// OpenWeatherMap 응답을 애플리케이션에서 사용하기 편한 형태로 변환합니다.
export const fetchCurrentWeather = async (location) => {
  const response = await weatherClient.get('/weather', {
    params: {
      lat: location.lat,
      lon: location.lon,
      appid: import.meta.env.VITE_OPENWEATHER_API_KEY,
      units: 'metric',
      lang: 'kr',
    },
  })

  const data = response.data

  return {
    id: location.id,
    openWeatherId: data.id,
    name: location.name,
    apiLocationName: data.name,
    temp: Math.round(data.main.temp * 10) / 10,
    feelsLike: Math.round(data.main.feels_like * 10) / 10,
    humidity: data.main.humidity,
    status: data.weather[0]?.description ?? '정보 없음',
    iconCode: data.weather[0]?.icon ?? '',
    windSpeed: data.wind.speed,
    observedAt: data.dt,
  }
}

export const getWeatherIconUrl = (iconCode) => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`
}
