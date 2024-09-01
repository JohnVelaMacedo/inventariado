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
  isOpenAlertDelete: boolean
  productIdDelete: string
}

type ProductDeleteDialogEmits = {
  setOpenAlertDelete: [isOpen: boolean]
}

const props = defineProps<ProductDeleteDialogProps>()
const emit = defineEmits<ProductDeleteDialogEmits>()

function handleCancel() {
  console.log('handleCancel')
  emit('setOpenAlertDelete', false)
}

function handleDelete() {
  console.log('handleDelete', props.productIdDelete)
  toast({
    title: 'Exitoso!',
    description: 'Registro eliminado correctamente'
  })
  handleCancel()
}
</script>

<template>
  <AlertDialog :open="props.isOpenAlertDelete">
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
