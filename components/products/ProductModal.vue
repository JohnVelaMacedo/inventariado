<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { PlusCircle } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import z from 'zod'
import { dataItems } from '~/data'
import { Button } from '../ui/button'
import { Dialog, DialogTrigger } from '../ui/dialog'
import { toast } from '../ui/toast'

type ProductModalProps = {
  openProductModal: boolean
  productId: string
}

type ProductModalEmits = {
  handleToggleProductModal: [openModal: boolean, productId?: string]
}

const props = defineProps<ProductModalProps>()
const emits = defineEmits<ProductModalEmits>()

const formSchema = toTypedSchema(
  z.object({
    name: z
      .string({ required_error: 'El campo Nombre es obligatorio' })
      .min(2, { message: 'Debe ser de 2 a más caracteres' })
      .max(50, { message: 'Debe ser menos de 50 caracteres' }),
    price: z
      .number({
        required_error: 'El campo Precio es obligatorio',
        invalid_type_error: 'El campo Precio debe ser un número'
      })
      .positive({ message: 'Debe ser un número positivo' })
      .safe()
  })
)

const { isFieldDirty, setValues, handleSubmit } = useForm({
  validationSchema: formSchema
})

const label = computed(() => {
  return props.productId ? 'Editar Producto' : 'Crear Producto'
})

const onSubmit = handleSubmit((values) => {
  // TODO: Hacer una petición POST para guardar
  console.log({ ...values, id: props.productId })
  toast({
    title: 'Exitoso!',
    description: props.productId
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
  productId: string = ''
) {
  emits('handleToggleProductModal', openModal, productId)
}

watch(
  () => props.productId,
  (newProductId) => {
    if (newProductId) {
      const item = dataItems.find((data) => data.id === newProductId)
      setValues({
        name: item?.name,
        price: item?.price
      })
    }
  }
)
</script>

<template>
  <div class="text-right mb-2">
    <Dialog
      :open="props.openProductModal"
      @update:open="handleUpdateOpenModal"
    >
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          @click="handleToggleModal(true)"
        >
          <PlusCircle class="h-3.5 w-3.5 mr-2" />
          Agregar Producto
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

          <FormField
            v-slot="{ componentField }"
            name="price"
            :validate-on-blur="!isFieldDirty"
          >
            <FormItem>
              <FormLabel>Precio</FormLabel>

              <FormControl>
                <Input
                  type="number"
                  placeholder="Precio"
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
                Cerrar
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  </div>
</template>
