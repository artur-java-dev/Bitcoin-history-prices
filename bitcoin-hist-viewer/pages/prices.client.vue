<script setup lang="ts">
import { useAsyncData, useRuntimeConfig } from 'nuxt/app'
import { computed, ref, useTemplateRef } from 'vue'
import type { DateRange } from '~/utils/dates-utils'
import { dateToStr } from '~/utils/date-convert'
import type { Price } from '~/utils/types-common'


const config = useRuntimeConfig()
const prefix = config.public.apiPrefix
const apiRoute = `${prefix}/hist/get`

const period = ref<DateRange>()
const periodChooser = useTemplateRef("periodChooser")


const { data, error, status, execute } =
  await useAsyncData(getPrices, {
    immediate: false,
    lazy: true,
    server: false
  })


const hasData = computed(() =>
  (data.value?.length ?? 0) > 0
)

const showChooser = computed(() =>
  status.value === 'idle' || status.value === 'success')


function onchange() {
  period.value = periodChooser.value?.datePeriod
  execute()
}


type Dto = {
  success: boolean
  prices: Price[]
}


async function getPrices(): Promise<Price[] | undefined> {
  if (period.value === undefined)
    return

  const { startDate, endDate } = period.value

  const response =
    await $fetch<Dto>(apiRoute, {
      // method: 'GET',
      responseType: 'json',
      query: {
        startDate: dateToStr(startDate),
        endDate: dateToStr(endDate)
      }
    })

  return response.prices
}

</script>


<template>
  <AppHeader />

  <div class="container">

    <div v-if="showChooser">
      <PeriodChooser ref="periodChooser" @change="onchange" />
    </div>

    <div v-else-if="status === 'pending'">
      <p>В данный момент идет загрузка данных.</p>
    </div>

    <div v-else-if="status === 'error'">
      <p>Произошла ошибка при загрузке данных:</p>
      <div>{{ error?.message }}</div>
    </div>

    <div v-if="status === 'success'">
      <p v-if="!hasData">Нет данных за выбранный период</p>
      <PricesChart v-else :data="data!" />
    </div>

  </div>
</template>


<style lang="css" scoped>
div.container {
  padding-left: 4rem;
  padding-right: 4rem;
}
</style>
