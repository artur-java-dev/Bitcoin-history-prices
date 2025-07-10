<script setup lang="ts">
import { ref } from 'vue'
import { currentYear } from '~/utils/dates-utils'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'


const year = ref(currentYear())
const picker = useTemplateRef("picker")
const emit = defineEmits(["change"])


function handleDate(modelData: number | string) {
  year.value = Number(modelData)
  picker.value!.closeMenu()
  emit('change')
}


defineExpose({
  pickedYear: year
})

</script>


<template>
  <VueDatePicker year-picker ref="picker" v-model="year" utc @update:model-value="handleDate" />
</template>
