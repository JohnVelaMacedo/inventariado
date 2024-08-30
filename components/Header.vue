<script setup lang="ts">
import { CircleUser, Menu, Package2, Search } from 'lucide-vue-next'
import { items } from '~/data'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from './ui/dropdown-menu'
import { Input } from './ui/input'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'

const route = useRoute()
</script>

<template>
  <header
    class="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6"
  >
    <Sheet>
      <SheetTrigger as-child>
        <Button
          variant="outline"
          size="icon"
          class="shrink-0 md:hidden"
        >
          <Menu class="h-5 w-5" />

          <span class="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>

      <SheetContent
        side="left"
        class="flex flex-col"
      >
        <nav class="grid gap-2 text-lg font-medium">
          <NuxtLink
            to="/"
            class="flex items-center gap-2 text-lg font-semibold"
          >
            <Package2 class="h-6 w-6" />

            <span class="sr-only">Acme Inc</span>
          </NuxtLink>

          <NuxtLink
            v-for="item in items"
            :key="item.url"
            :to="item.url"
            class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-foreground hover:text-foreground"
            active-class="bg-muted"
          >
            <component
              :is="item.icon"
              class="h-5 w-5"
            />
            {{ item.label }}
          </NuxtLink>
        </nav>
      </SheetContent>
    </Sheet>

    <div class="w-full flex-1">
      <form>
        <div class="relative">
          <Search
            class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
          />

          <Input
            type="search"
            placeholder="Search products..."
            class="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
          />
        </div>
      </form>
    </div>

    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button
          variant="secondary"
          size="icon"
          class="rounded-full"
        >
          <CircleUser class="h-5 w-5" />
          <span class="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem>Settings</DropdownMenuItem>

        <DropdownMenuItem>Support</DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </header>
</template>
