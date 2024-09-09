<script setup lang="ts">
import { columns, type Seller } from '~/components/seller/columns'
import SellerDeleteDialog from '~/components/seller/SellerDeleteDialog.vue'
import SellerModal from '~/components/seller/SellerModal.vue'
import DataTable from '~/components/ui/data-table.vue'
import { Toaster } from '~/components/ui/toast'
import { dataSellers } from '~/data'

const data = ref<Seller[]>([])

const openDeleteDialog = ref(false)
const openSellerModal = ref(false)
const sellerId = ref('')

function handleToggleDeleteDialog(
  openDialog: boolean,
  id: string = ''
) {
  openDeleteDialog.value = openDialog
  sellerId.value = id
}

function handleToggleSellerModal(
  openModal: boolean,
  id: string = ''
) {
  openSellerModal.value = openModal
  sellerId.value = id
}

async function getData(): Promise<Seller[]> {
  // TODO: Fetch data from your API here.
  return dataSellers
}

onMounted(async () => {
  data.value = await getData()
})

provide('sellerPage', {
  handleToggleSellerModal,
  handleToggleDeleteDialog
})
</script>

<template>
  <div class="container py-10 mx-auto">
    <SellerModal
      :open-seller-modal="openSellerModal"
      :seller-id="sellerId"
      @handle-toggle-seller-modal="handleToggleSellerModal"
    />

    <DataTable
      :columns="columns"
      :data="data"
    />

    <SellerDeleteDialog
      :open-delete-dialog="openDeleteDialog"
      :seller-id="sellerId"
      @handle-toggle-delete-dialog="handleToggleDeleteDialog"
    />

    <Toaster />
  </div>
</template>
