<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { PlusCircle } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import z from 'zod'
import { dataCustomers } from '~/data'
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
  FormLabel,
  FormMessage
} from '../ui/form'
import { Input } from '../ui/input'
import { toast } from '../ui/toast'

type CustomerModalProps = {
  openCustomerModal: boolean
  customerId: string
}

type CustomerModalEmits = {
  handleToggleCustomerModal: [openModal: boolean, customerId?: string]
}

const props = defineProps<CustomerModalProps>()
const emits = defineEmits<CustomerModalEmits>()

const formSchema = toTypedSchema(
  z.object({
    name: z
      .string({ required_error: 'El campo Nombre es obligatorio' })
      .min(2, { message: 'Debe ser de 2 a más caracteres' })
      .max(50, { message: 'Debe ser menos de 50 caracteres' }),
    lastName: z
      .string({ required_error: 'El campo Apellido es obligatorio' })
      .min(2, { message: 'Debe ser de 2 a más caracteres' })
      .max(50, { message: 'Debe ser menos de 50 caracteres' }),
    numberDocument: z
      .string({
        required_error: 'El campo Número de Documento es obligatorio'
      })
      .min(2, { message: 'Debe ser de 2 a más caracteres' })
      .max(8, { message: 'Debe ser menos de 8 caracteres' })
  })
)

const { isFieldDirty, setValues, handleSubmit } = useForm({
  validationSchema: formSchema
})

const label = computed(() => {
  return props.customerId ? 'Editar Cliente' : 'Crear Cliente'
})

const onSubmit = handleSubmit((values) => {
  // TODO: Hacer una petición POST para guardar
  console.log({ ...values, id: props.customerId })
  toast({
    title: 'Exitoso!',
    description: props.customerId
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
  customerId: string = ''
) {
  emits('handleToggleCustomerModal', openModal, customerId)
}

watch(
  () => props.customerId,
  (customerId) => {
    if (customerId) {
      const item = dataCustomers.find(
        (data) => data.id === customerId
      )
      setValues({
        name: item?.name,
        lastName: item?.lastName,
        numberDocument: item?.numberDocument
      })
    }
  }
)
</script>

<template>
  <div class="text-right mb-2">
    <Dialog
      :open="props.openCustomerModal"
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
            name="lastName"
            :validate-on-blur="!isFieldDirty"
          >
            <FormItem>
              <FormLabel>Apellido</FormLabel>

              <FormControl>
                <Input
                  type="text"
                  placeholder="Apellido"
                  v-bind="componentField"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          </FormField>

          <FormField
            v-slot="{ componentField }"
            name="numberDocument"
            :validate-on-blur="!isFieldDirty"
          >
            <FormItem>
              <FormLabel>Número de Documento</FormLabel>

              <FormControl>
                <Input
                  type="text"
                  placeholder="Número de Documento"
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
