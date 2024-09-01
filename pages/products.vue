<script setup lang="ts">
import { PlusCircle } from 'lucide-vue-next'
import { columns, type Products } from '~/components/products/columns'
import DataTable from '~/components/products/data-table.vue'
import ProductDeleteDialog from '~/components/products/ProductDeleteDialog.vue'
import ProductDialog from '~/components/products/ProductDialog.vue'
import { Button } from '~/components/ui/button'
import { Dialog, DialogTrigger } from '~/components/ui/dialog'
import { Toaster } from '~/components/ui/toast'
import { dataItems } from '~/data'

const isOpen = ref(false)
const isOpenAlertDelete = ref(false)
const data = ref<Products[]>([])
const productId = ref('')
const productIdDelete = ref('')

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

function handleOpenModalDelete(id: string) {
  isOpenAlertDelete.value = true
  productIdDelete.value = id
}

function setOpenAlertDelete(isOpen: boolean) {
  isOpenAlertDelete.value = isOpen
  productIdDelete.value = ''
}

async function getData(): Promise<Products[]> {
  // TODO: Fetch data from your API here.
  return dataItems
}

onMounted(async () => {
  data.value = await getData()
})

provide('productId', {
  productId,
  handleEditProduct,
  handleOpenModalDelete
})
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

    <ProductDeleteDialog
      :is-open-alert-delete="isOpenAlertDelete"
      :product-id-delete="productIdDelete"
      @setOpenAlertDelete="setOpenAlertDelete"
    />

    <Toaster />
  </div>
</template>
