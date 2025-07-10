<script setup lang="ts">
import VueSelect from "vue3-select-component"
import {
  currentDate, dateRange, getMonthRange, getSingleDayRange, getYearRange,
  type DateRange
} from '~/utils/dates-utils'


type Period = "year" | "month" | "week" | "day" | "range"


const period = ref<Period>("day")
const yearPicker = useTemplateRef("yearPicker")
const monthPicker = useTemplateRef("monthPicker")
const weekPicker = useTemplateRef("weekPicker")
const datePicker = useTemplateRef("datePicker")
const rangePicker = useTemplateRef("rangePicker")
const emit = defineEmits(["change"])

const datePeriod = ref<DateRange>({
  startDate: currentDate(),
  endDate: currentDate()
})


function onchange() {
  datePeriod.value = getDateRange()
  emit('change')
}


function getDateRange(): DateRange {
  switch (period.value) {
    case 'year':
      return getYearRange(yearPicker.value!.pickedYear)
    case 'month':
      return getMonthRange(monthPicker.value!.pickedMonth)
    case 'week':
      return dateRange(weekPicker.value!.pickedWeek)
    case 'day':
      return getSingleDayRange(datePicker.value!.pickedDate())
    case 'range':
      const rng = rangePicker.value!.pickedRange()
      return dateRange([rng.startDate, rng.endDate])
  }
}


defineExpose({
  datePeriod
})

</script>


<template>
  <div class="container">

    <VueSelect :isClearable="false" :isSearchable="false" :options="[
      { label: 'Год', value: 'year' },
      { label: 'Месяц', value: 'month' },
      { label: 'Неделя', value: 'week' },
      { label: 'День', value: 'day' },
      { label: 'Произвольный', value: 'range' },
    ]" placeholder="Выберите период" v-model="period" />


    <div class="picker">
      <YearPicker ref="yearPicker" v-if="period === 'year'" @change="onchange" />
      <MonthPicker ref="monthPicker" v-else-if="period === 'month'" @change="onchange" />
      <WeekPicker ref="weekPicker" v-else-if="period === 'week'" @change="onchange" />
      <DatePicker ref="datePicker" v-else-if="period === 'day'" @change="onchange" />
      <RangePicker ref="rangePicker" v-else-if="period === 'range'" @change="onchange" />
    </div>

  </div>
</template>


<style lang="css" scoped>
div.container {
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

:deep(.vue-select) {
  max-width: 200px;
  --vs-min-height: 2.5rem;
  --vs-padding: 4px 8px 4px 16px;
  --vs-option-hover-text-color: rgb(45, 87, 44);
  --vs-option-hover-background-color: #93c5fd;
  --vs-option-focused-text-color: rgb(45, 87, 44);
  --vs-option-focused-background-color: var(--vs-menu-background);
}

:deep(.vue-select .menu-option):hover {
  --vs-option-focused-background-color: #93c5fd;
}

div.picker {
  max-width: 400px;
  margin-left: 1rem;
  margin-right: 1rem;
}
</style>
