<script setup lang="ts">
import { ref } from 'vue'
import { currentMonth, currentYear } from '~/utils/dates-utils'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'


const month = ref({
  month: currentMonth(),
  year: currentYear()
})
const picker = useTemplateRef("picker")
const emit = defineEmits(["change"])


function handleDate(modelData: { month: number | string; year: number | string }) {
  month.value.month = Number(modelData.month)
  month.value.year = Number(modelData.year)
  picker.value!.closeMenu()
  emit('change')
}

defineExpose({
  pickedMonth: month
})

</script>


<template>
  <VueDatePicker month-picker ref="picker" v-model="month" utc @update:model-value="handleDate" />
</template>
