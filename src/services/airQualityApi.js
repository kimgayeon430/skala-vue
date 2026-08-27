import axios from 'axios'

const AIR_QUALITY_URL = 'https://air-quality-api.open-meteo.com/v1/air-quality'

const getAirQualityStatus = (aqi) => {
  if (aqi <= 50) return '좋음'
  if (aqi <= 100) return '보통'
  if (aqi <= 150) return '민감군 주의'
  if (aqi <= 200) return '나쁨'
  if (aqi <= 300) return '매우 나쁨'
  return '위험'
}

export const fetchAirQuality = async (location) => {
  const response = await axios.get(AIR_QUALITY_URL, {
    params: {
      latitude: location.lat,
      longitude: location.lon,
      current: 'us_aqi,pm10,pm2_5',
      timezone: 'Asia/Seoul',
    },
  })

  const current = response.data.current

  return {
    aqi: current.us_aqi,
    pm10: current.pm10,
    pm2_5: current.pm2_5,
    airQualityStatus: getAirQualityStatus(current.us_aqi),
  }
}
