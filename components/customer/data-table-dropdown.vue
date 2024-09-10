<script setup lang="ts">
import { MoreHorizontal } from 'lucide-vue-next'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'

interface Props {
  payment: {
    id: string
  }
}

type InjectProps = {
  handleToggleDeleteDialog: (
    openDialog: boolean,
    customerId?: string
  ) => void
  handleToggleCustomerModal: (
    openModal: boolean,
    customerId?: string
  ) => void
}

const props = defineProps<Props>()
const { handleToggleDeleteDialog, handleToggleCustomerModal } =
  inject('customerPage') as InjectProps

// function copy(id: string) {
//   navigator.clipboard.writeText(id)
// }
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button
        variant="ghost"
        class="w-8 h-8 p-0"
      >
        <span class="sr-only">Open menu</span>
        <MoreHorizontal class="w-4 h-4" />
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Acciones</DropdownMenuLabel>

      <DropdownMenuItem
        class="cursor-pointer"
        @click="handleToggleCustomerModal(true, props.payment.id)"
      >
        Editar
      </DropdownMenuItem>

      <DropdownMenuItem
        class="cursor-pointer"
        @click="handleToggleDeleteDialog(true, props.payment.id)"
      >
        Eliminar
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
