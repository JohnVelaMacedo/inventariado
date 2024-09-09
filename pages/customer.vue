<script setup lang="ts">
import { columns, type Customer } from '~/components/customer/columns'
import DataTable from '~/components/ui/data-table.vue'
import { dataCustomers } from '~/data'

const data = ref<Customer[]>([])

async function getData(): Promise<Customer[]> {
  // TODO: Fetch data from your API here.
  return dataCustomers
}

onMounted(async () => {
  data.value = await getData()
})
</script>

<template>
  <div class="container py-10 mx-auto">
    <DataTable
      :columns="columns"
      :data="data"
    />
  </div>
</template>
