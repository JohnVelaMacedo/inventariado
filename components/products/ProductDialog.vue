<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import z from 'zod'
import { dataItems } from '~/data'
import { Button } from '../ui/button'
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '../ui/dialog'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form'

type InjectProps = {
  productId: Ref<string>
}

type ProductDialogEmits = {
  handleOpenModal: [openModal: boolean]
}

const emits = defineEmits<ProductDialogEmits>()
const { productId } = inject('productId') as InjectProps
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

const onSubmit = handleSubmit((values) => {
  // TODO: Hacer una petición POST para guardar
  console.log(values)
  emits('handleOpenModal', false)
})

watch(productId, (newId) => {
  if (newId) {
    const item = dataItems.find((data) => data.id === newId)
    setValues({
      name: item?.name,
      price: item?.price
    })
  }
})
</script>

<template>
  <DialogContent class="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>
        {{ productId ? 'Editar Producto' : 'Agregar Producto' }}
      </DialogTitle>
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
          <button
            class="bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            type="button"
          >
            Cerrar
          </button>
        </DialogClose>
      </DialogFooter>
    </form>
  </DialogContent>
</template>
