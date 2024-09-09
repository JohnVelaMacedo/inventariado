import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'
import DropdownAction from './data-table-dropdown.vue'

export type Customer = {
  id: string
  name: string
  lastName: string
  numberDocument: string
}

type CustomerAdditional = Customer & {
  fullName?: string
}

export const columns: ColumnDef<CustomerAdditional>[] = [
  {
    accessorKey: 'fullName',
    header: 'Nombre Completo',
    cell: ({ row }) => {
      const { name, lastName } = row.original
      const fullName = `${name} ${lastName}`

      return h('div', null, fullName)
    }
  },
  {
    accessorKey: 'numberDocument',
    header: 'DNI'
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return h(
        'div',
        { class: 'relative' },
        h(DropdownAction, {
          payment
        })
      )
    }
  }
]
