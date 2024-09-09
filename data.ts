import { Package, ShoppingCart, Users } from 'lucide-vue-next'

export const items = [
  { icon: ShoppingCart, label: 'Vendedor', url: '/seller' },
  { icon: Package, label: 'Productos', url: '/products' },
  { icon: Users, label: 'Clientes', url: '/customer' }
]

export const dataItems = [
  {
    id: 'm5gr84i9',
    name: 'Clavo 1/2',
    price: 316
  },
  {
    id: '3u1reuv4',
    name: 'Tornillo',
    price: 10.3
  },
  {
    id: 'derv1ws0',
    name: 'Calamina',
    price: 6
  },
  {
    id: '5kma53ae',
    name: 'Manguito',
    price: 5
  },
  {
    id: 'bhqecj4p',
    name: 'Perno',
    price: 4
  }
]

export const dataSellers = [
  {
    id: 'bhqecj4p',
    name: 'Sergio Orlando Fung Vargas'
  },
  {
    id: '5kma53ae',
    name: 'Jhon Wagner Mendoza'
  }
]

export const dataCustomers = [
  {
    id: 'bhqecj4p',
    name: 'Sergio Orlando',
    lastName: 'Fung Vargas',
    numberDocument: '70379678'
  },
  {
    id: '5kma53ae',
    name: 'Jhon',
    lastName: 'Wagner Mendoza',
    numberDocument: '70379679'
  }
]
