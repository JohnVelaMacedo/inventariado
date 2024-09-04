<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '../ui/alert-dialog'
import { toast } from '../ui/toast'

type ProductDeleteDialogProps = {
  openDeleteDialog: boolean
  productId: string
}

type ProductDeleteDialogEmits = {
  handleToggleDeleteDialog: [openDialog: boolean]
}

const props = defineProps<ProductDeleteDialogProps>()
const emit = defineEmits<ProductDeleteDialogEmits>()

function handleCancel() {
  emit('handleToggleDeleteDialog', false)
}

function handleDelete() {
  toast({
    title: 'Exitoso!',
    description: 'Registro eliminado correctamente',
    duration: 2500
  })
  handleCancel()
}
</script>

<template>
  <AlertDialog :open="props.openDeleteDialog">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          Está seguro de eliminar este registro?
        </AlertDialogTitle>

        <AlertDialogDescription>
          Esta acción no podrá ser deshecha
        </AlertDialogDescription>
      </AlertDialogHeader>

      <AlertDialogFooter>
        <AlertDialogCancel @click="handleCancel">
          Cancelar
        </AlertDialogCancel>

        <AlertDialogAction @click="handleDelete">
          Eliminar
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
