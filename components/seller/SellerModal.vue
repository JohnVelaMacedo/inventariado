<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { PlusCircle } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import z from 'zod'
import { dataSellers } from '~/data'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../ui/dialog'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from '../ui/form'
import { Input } from '../ui/input'
import { toast } from '../ui/toast'

type SellerModalProps = {
  openSellerModal: boolean
  sellerId: string
}

type SellerModalEmits = {
  handleToggleSellerModal: [openModal: boolean, sellerId?: string]
}

const props = defineProps<SellerModalProps>()
const emits = defineEmits<SellerModalEmits>()

const formSchema = toTypedSchema(
  z.object({
    name: z
      .string({ required_error: 'El campo Nombre es obligatorio' })
      .min(2, { message: 'Debe ser de 2 a más caracteres' })
      .max(50, { message: 'Debe ser menos de 50 caracteres' })
  })
)

const { isFieldDirty, setValues, handleSubmit } = useForm({
  validationSchema: formSchema
})

const label = computed(() => {
  return props.sellerId ? 'Editar Vendedor' : 'Crear Vendedor'
})

const onSubmit = handleSubmit((values) => {
  // TODO: Hacer una petición POST para guardar
  console.log({ ...values, id: props.sellerId })
  toast({
    title: 'Exitoso!',
    description: props.sellerId
      ? 'Registro actualizado correctamente'
      : 'Registro creado correctamente',
    duration: 2500
  })
  handleToggleModal(false)
})

function handleUpdateOpenModal(openModal: boolean) {
  handleToggleModal(openModal)
}

function handleToggleModal(
  openModal: boolean,
  sellerId: string = ''
) {
  emits('handleToggleSellerModal', openModal, sellerId)
}

watch(
  () => props.sellerId,
  (newProductId) => {
    if (newProductId) {
      const item = dataSellers.find(
        (data) => data.id === newProductId
      )
      setValues({
        name: item?.name
      })
    }
  }
)
</script>

<template>
  <div class="text-right mb-2">
    <Dialog
      :open="props.openSellerModal"
      @update:open="handleUpdateOpenModal"
    >
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="outline"
        >
          <PlusCircle class="h-3.5 w-3.5 mr-2" />
          Agregar Vendedor
        </Button>
      </DialogTrigger>

      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{{ label }}</DialogTitle>
        </DialogHeader>

        <form
          class="grid gap-4 py-4"
          @submit="onSubmit"
          autocomplete="off"
        >
          <FormField
            v-slot="{ componentField }"
            name="name"
            :validate-on-blur="!isFieldDirty"
          >
            <FormItem>
              <FormLabel>Nombre</FormLabel>

              <FormControl>
                <Input
                  type="text"
                  placeholder="Nombre"
                  v-bind="componentField"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          </FormField>

          <DialogFooter class="flex-col gap-2">
            <Button type="submit">Guardar</Button>

            <DialogClose as-child>
              <Button
                type="button"
                variant="secondary"
                @click="handleToggleModal(false)"
              >
                Cancelar
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  </div>
</template>
