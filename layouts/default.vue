<script setup lang="ts">
import Header from '~/components/Header.vue'
import Sidebar from '~/components/Sidebar.vue'
import { items } from '~/data'

const route = useRoute()
const label = computed(() => {
  const itemData = items.find((item) => item.url === route.path)
  return itemData?.label ?? 'Inicio'
})
</script>

<template>
  <div
    class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]"
  >
    <Sidebar />

    <div class="flex flex-col">
      <Header />

      <main class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div class="flex items-center">
          <h1 class="text-lg font-semibold md:text-2xl">
            {{ label }}
          </h1>
        </div>

        <div class="flex flex-1 px-4 rounded-lg border shadow-sm">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>
