<script setup lang="ts">
import { ref } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { currentWeekRange } from '~/utils/dates-utils'


const dateRange = ref(currentWeekRange())
const picker = useTemplateRef("picker")
const emit = defineEmits(["change"])


function handleDate(modelData: [Date, Date] | [string, string]) {
  if (isStrDates(modelData))
    dateRange.value = [new Date(modelData[0]), new Date(modelData[1])]
  else
    dateRange.value = modelData
  picker.value!.closeMenu()
  emit('change')
}


function isStrDates(v: [Date, Date] | [string, string])
  : v is [string, string] {
  return isStr(v[0]) && isStr(v[1])
}


function format(dates: Date[]) {
  const dt1 = dates[0]
  const dt2 = dates[1]
  return `${str(dt1)} - ${str(dt2)}`
}

function str(dt: Date) {
  const y = dt.getFullYear()
  const m = dt.getMonth() + 1
  const d = dt.getDate()
  const dd = (d < 10) ? ('0' + d) : String(d)
  const mm = (m < 10) ? ('0' + m) : String(m)
  return `${dd}/${mm}/${y}`
}


function range() {
  return {
    startDate: dateRange.value[0],
    endDate: dateRange.value[1]
  }
}

defineExpose({
  pickedRange: range
})

</script>


<template>
  <VueDatePicker range multi-calendars :enable-time-picker="false" ref="picker" v-model="dateRange" utc :format="format"
    @update:model-value="handleDate" />
</template>
