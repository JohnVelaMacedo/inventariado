<script setup lang="ts">
import { columns, type Seller } from '~/components/seller/columns'
import DataTable from '~/components/ui/data-table.vue'
import { dataSellers } from '~/data'

const data = ref<Seller[]>([])

async function getData(): Promise<Seller[]> {
  // TODO: Fetch data from your API here.
  return dataSellers
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
