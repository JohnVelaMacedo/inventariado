import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'
import DropdownAction from './data-table-dropdown.vue'

export interface Seller {
  id: string
  name: string
}

export const columns: ColumnDef<Seller>[] = [
  { accessorKey: 'name', header: 'Nombre' },
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
