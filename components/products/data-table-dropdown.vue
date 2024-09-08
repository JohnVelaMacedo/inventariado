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
    productId?: string
  ) => void
  handleToggleProductModal: (
    openModal: boolean,
    productId?: string
  ) => void
}

const props = defineProps<Props>()
const { handleToggleDeleteDialog, handleToggleProductModal } = inject(
  'productPage'
) as InjectProps

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
        @click="handleToggleProductModal(true, props.payment.id)"
        class="cursor-pointer"
      >
        Editar
      </DropdownMenuItem>

      <DropdownMenuItem
        @click="handleToggleDeleteDialog(true, props.payment.id)"
        class="cursor-pointer"
      >
        Eliminar
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
