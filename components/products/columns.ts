import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'
import DropdownAction from './data-table-dropdown.vue'

export interface Payment {
  id: string
  name: string
  price: number
}

export const columns: ColumnDef<Payment>[] = [
  { accessorKey: 'name', header: 'Nombre' },
  {
    accessorKey: 'price',
    header: 'Precio',
    cell: ({ row }) => {
      const price = Number.parseFloat(row.getValue('price'))
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(price)

      return h('div', { class: 'font-medium' }, formatted)
    }
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
