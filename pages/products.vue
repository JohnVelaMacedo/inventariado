<script setup lang="ts">
import { PlusCircle } from 'lucide-vue-next'
import { columns, type Payment } from '~/components/products/columns'
import DataTable from '~/components/products/data-table.vue'
import { Button } from '~/components/ui/button'

const data = ref<Payment[]>([])

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: 'm5gr84i9',
      name: 'Clavo 1/2',
      price: 316
    },
    {
      id: '3u1reuv4',
      name: 'Tornillo',
      price: 10.3
    },
    {
      id: 'derv1ws0',
      name: 'Calamina',
      price: 6
    },
    {
      id: '5kma53ae',
      name: 'Manguito',
      price: 5
    },
    {
      id: 'bhqecj4p',
      name: 'Perno',
      price: 4
    }
  ]
}

onMounted(async () => {
  data.value = await getData()
})
</script>

<template>
  <div class="container py-10 mx-auto">
    <div class="text-right mb-2">
      <Button size="sm">
        <PlusCircle class="h-3.5 w-3.5" />
        Agregar Producto
      </Button>
    </div>

    <DataTable
      :columns="columns"
      :data="data"
    />
  </div>
</template>
