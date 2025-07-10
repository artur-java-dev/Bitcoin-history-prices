<script setup lang="ts">
import { computed, ref } from 'vue'
import { LineChart } from 'vue-chart-3'
import type { Price } from '~/utils/types-common'


type Props = {
  data: Price[]
}

const props = defineProps<Props>()


const options = ref({
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        color: "rgba(0, 0, 0, 0.03)",
      },
    },
    y: {
      grid: {
        color: "rgba(100, 100, 100, 0.2)",
      },
      title: {
        display: true,
        text: "Цена (USD)"
      }
    }
  }
})


const timeLabels = computed(() =>
  props.data.map(price => dateFormat(price[0])))

function dateFormat(ts: number) {
  const dt = new Date(ts)
  const dateStr = dt.toLocaleDateString("ru-RU")
  const h = dt.getUTCHours()
  return `${dateStr} (${h}ч)`
}


const values = computed(() =>
  props.data.map(price => price[1]))


const data = computed(() => ({
  labels: timeLabels.value,
  datasets: [
    {
      data: values.value,
      borderColor: "rgb(71,167,106)",
      borderWidth: 1,
      pointStyle: 'circle',
      pointRadius: 2,
      tension: 0.2,
      fill: true
    }
  ]
}))

</script>


<template>
  <div>
    <LineChart ref="lineChart" :chartData="data" :options="options" />
  </div>
</template>
