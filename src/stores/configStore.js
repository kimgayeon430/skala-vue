import { ref, computed } from 'vue'

import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', () => {
  // state: 현재 선택한 온도 단위
  const unit = ref('celsius')

  // 추가 state: 날씨 카드의 온도 상태 라벨 표시 여부
  const showTemperatureLabel = ref(true)

  // Element Plus Color Picker로 선택하는 버튼 색상
  const buttonColor = ref(null)

  // getter: 현재 단위에 맞는 기호
  const unitSymbol = computed(() => {
    return unit.value === 'celsius' ? '℃' : '℉'
  })

  // 추가 getter: 현재 라벨 상태에 맞는 버튼 문구
  const temperatureLabelButtonText = computed(() => {
    return showTemperatureLabel.value ? '상태 라벨 숨기기' : '상태 라벨 보이기'
  })

  const buttonStyle = computed(() => {
    if (!buttonColor.value) {
      return {}
    }

    return {
      backgroundColor: buttonColor.value,
      borderColor: buttonColor.value,
      color: 'white',
    }
  })

  // action: 섭씨와 화씨를 전환
  function toggleUnit() {
    unit.value = unit.value === 'celsius' ? 'fahrenheit' : 'celsius'
  }

  // 추가 action: 모든 날씨 카드의 상태 라벨 표시 여부를 전환
  function toggleTemperatureLabel() {
    showTemperatureLabel.value = !showTemperatureLabel.value
  }

  function setButtonColor(color) {
    buttonColor.value = color
  }

  return {
    unit,
    unitSymbol,
    toggleUnit,
    showTemperatureLabel,
    temperatureLabelButtonText,
    toggleTemperatureLabel,
    buttonColor,
    buttonStyle,
    setButtonColor,
  }
})
