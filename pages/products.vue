<script setup lang="ts">
import { columns, type Products } from '~/components/products/columns'
import ProductDeleteDialog from '~/components/products/ProductDeleteDialog.vue'
import ProductModal from '~/components/products/ProductModal.vue'
import DataTable from '~/components/ui/data-table.vue'
import { Toaster } from '~/components/ui/toast'
import { dataItems } from '~/data'

const data = ref<Products[]>([])

const openDeleteDialog = ref(false)
const openProductModal = ref(false)
const productId = ref('')

function handleToggleDeleteDialog(
  openDialog: boolean,
  id: string = ''
) {
  openDeleteDialog.value = openDialog
  productId.value = id
}

function handleToggleProductModal(
  openModal: boolean,
  id: string = ''
) {
  openProductModal.value = openModal
  productId.value = id
}

async function getData(): Promise<Products[]> {
  // TODO: Fetch data from your API here.
  return dataItems
}

onMounted(async () => {
  data.value = await getData()
})

provide('productPage', {
  handleToggleProductModal,
  handleToggleDeleteDialog
})
</script>

<template>
  <div class="container py-10 mx-auto">
    <ProductModal
      :open-product-modal="openProductModal"
      :product-id="productId"
      @handle-toggle-product-modal="handleToggleProductModal"
    />

    <DataTable
      :columns="columns"
      :data="data"
    />

    <ProductDeleteDialog
      :open-delete-dialog="openDeleteDialog"
      :product-id="productId"
      @handle-toggle-delete-dialog="handleToggleDeleteDialog"
    />

    <Toaster />
  </div>
</template>
