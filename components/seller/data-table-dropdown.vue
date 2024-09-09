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
    sellerId?: string
  ) => void
  handleToggleSellerModal: (
    openModal: boolean,
    sellerId?: string
  ) => void
}

const props = defineProps<Props>()
const { handleToggleDeleteDialog, handleToggleSellerModal } = inject(
  'sellerPage'
) as InjectProps
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
        @click="handleToggleSellerModal(true, props.payment.id)"
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
