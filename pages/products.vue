<script setup lang="ts">
import { PlusCircle } from 'lucide-vue-next'
import { columns, type Payment } from '~/components/products/columns'
import DataTable from '~/components/products/data-table.vue'
import ProductDialog from '~/components/products/ProductDialog.vue'
import { Button } from '~/components/ui/button'
import { Dialog, DialogTrigger } from '~/components/ui/dialog'
import { dataItems } from '~/data'

const isOpen = ref(false)
const data = ref<Payment[]>([])
const productId = ref('')

function handleOpenModal(openModal: boolean) {
  isOpen.value = openModal
  productId.value = ''
}

function handleClickOpenModal() {
  productId.value = ''
}

function handleEditProduct(id: string) {
  productId.value = id
  isOpen.value = true
}

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return dataItems
}

onMounted(async () => {
  data.value = await getData()
})

provide('productId', { productId, handleEditProduct })
</script>

<template>
  <div class="container py-10 mx-auto">
    <Dialog
      @update:open="handleOpenModal"
      :open="isOpen"
    >
      <div class="text-right mb-2">
        <DialogTrigger asChild>
          <Button
            size="sm"
            variant="outline"
            @click="handleClickOpenModal"
          >
            <PlusCircle class="h-3.5 w-3.5 mr-2" />
            Agregar Producto
          </Button>
        </DialogTrigger>
      </div>

      <ProductDialog @handleOpenModal="handleOpenModal" />
    </Dialog>

    <DataTable
      :columns="columns"
      :data="data"
    />
  </div>
</template>
