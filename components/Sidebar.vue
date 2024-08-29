<script setup lang="ts">
import { Package2 } from 'lucide-vue-next'
import { items } from '~/data'
</script>

<template>
  <aside class="hidden border-r bg-muted/40 md:block">
    <div class="flex h-full max-h-screen flex-col gap-2">
      <div
        class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6"
      >
        <NuxtLink
          to="/"
          class="flex items-center gap-2 font-semibold"
        >
          <Package2 class="h-6 w-6" />

          <span class="">Acme Inc</span>
        </NuxtLink>
      </div>

      <div class="flex-1">
        <nav
          class="grid items-start px-2 text-sm font-medium lg:px-4"
        >
          <NuxtLink
            v-for="item in items"
            :key="item.url"
            :to="item.url"
            class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            active-class="bg-muted"
          >
            <component
              :is="item.icon"
              class="h-4 w-4"
            />
            {{ item.label }}
          </NuxtLink>
        </nav>
      </div>
    </div>
  </aside>
</template>
