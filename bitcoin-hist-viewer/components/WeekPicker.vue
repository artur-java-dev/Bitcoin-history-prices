<script setup lang="ts">
import { ref } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { currentWeekRange } from '~/utils/dates-utils'


const dates = ref(currentWeekRange())
const picker = useTemplateRef("picker")
const emit = defineEmits(["change"])


function handleDate(modelData: [Date, Date] | [string, string]) {
  if (isStrDates(modelData))
    dates.value = [new Date(modelData[0]), new Date(modelData[1])]
  else
    dates.value = modelData
  picker.value!.closeMenu()
  emit('change')
}


function isStrDates(v: [Date, Date] | [string, string])
  : v is [string, string] {
  return isStr(v[0]) && isStr(v[1])
}


defineExpose({
  pickedWeek: dates
})


</script>


<template>
  <VueDatePicker week-picker :enable-time-picker="false" ref="picker" v-model="dates" utc
    @update:model-value="handleDate" />
</template>
