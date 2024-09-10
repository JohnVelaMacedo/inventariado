<script setup lang="ts">
import { columns, type Customer } from '~/components/customer/columns'
import CustomerDeleteDialog from '~/components/customer/CustomerDeleteDialog.vue'
import CustomerModal from '~/components/customer/CustomerModal.vue'
import DataTable from '~/components/ui/data-table.vue'
import { Toaster } from '~/components/ui/toast'
import { dataCustomers } from '~/data'

const data = ref<Customer[]>([])

const openDeleteDialog = ref(false)
const openCustomerModal = ref(false)
const customerId = ref('')

function handleToggleDeleteDialog(
  openDialog: boolean,
  id: string = ''
) {
  openDeleteDialog.value = openDialog
  customerId.value = id
}

function handleToggleCustomerModal(
  openModal: boolean,
  id: string = ''
) {
  openCustomerModal.value = openModal
  customerId.value = id
}

async function getData(): Promise<Customer[]> {
  // TODO: Fetch data from your API here.
  return dataCustomers
}

onMounted(async () => {
  data.value = await getData()
})

provide('customerPage', {
  handleToggleCustomerModal,
  handleToggleDeleteDialog
})
</script>

<template>
  <div class="container py-10 mx-auto">
    <CustomerModal
      :open-customer-modal="openCustomerModal"
      :customer-id="customerId"
      @handle-toggle-customer-modal="handleToggleCustomerModal"
    />

    <DataTable
      :columns="columns"
      :data="data"
    />

    <CustomerDeleteDialog
      :open-delete-dialog="openDeleteDialog"
      :customer-id="customerId"
      @handle-toggle-delete-dialog="handleToggleDeleteDialog"
    />

    <Toaster />
  </div>
</template>
