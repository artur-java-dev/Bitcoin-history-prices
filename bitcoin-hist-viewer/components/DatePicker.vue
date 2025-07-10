<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { currentDate } from '~/utils/dates-utils'


const date = ref(currentDate())
const picker = useTemplateRef("picker")
const emit = defineEmits(["change"])


function handleDate(modelData: Date | string) {
  date.value = isStr(modelData) ?
    new Date(modelData)
    : modelData
  picker.value!.closeMenu()
  emit('change')
}


function getDateObj() {
  return {
    day: date.value.getUTCDate(),
    month: date.value.getUTCMonth(),
    year: date.value.getUTCFullYear()
  }
}

defineExpose({
  pickedDate: getDateObj
})

</script>


<template>
  <VueDatePicker utc :enable-time-picker="false" ref="picker" :model-value="date" :format="'dd/MM/yyyy'"
    @update:model-value="handleDate" />
</template>
