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
  handleEditProduct: (productId: string) => void
}

const { handleEditProduct } = inject('productId') as InjectProps
const props = defineProps<Props>()

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

      <DropdownMenuItem @click="handleEditProduct(props.payment.id)">
        Editar
      </DropdownMenuItem>

      <DropdownMenuItem>Eliminar</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
