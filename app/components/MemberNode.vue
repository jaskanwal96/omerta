<template>
  <div class="flex flex-col items-center group relative">
    <!-- Image "Mugshot" -->
    <div 
      :class="[
        'bg-white p-1 shadow-md transition-transform duration-300 relative z-10',
        isBoss ? 'w-32' : isSmall ? 'w-16' : 'w-24',
        'group-hover:scale-105 group-hover:rotate-1'
      ]"
    >
      <img 
        v-if="member.imageUrl" 
        :src="member.imageUrl" 
        :class="[
          'object-cover grayscale contrast-125 sepia-[.3]',
          isBoss ? 'h-36 w-full' : isSmall ? 'h-20 w-full' : 'h-28 w-full'
        ]"
      >
      <div v-else :class="['bg-gray-200 flex items-center justify-center text-gray-400 font-typewriter', isBoss ? 'h-36' : isSmall ? 'h-20' : 'h-28']">
        ??
      </div>
    </div>

    <!-- Text Block -->
    <div class="mt-2 text-center max-w-[140px]">
      <div v-if="!isSmall" class="text-[10px] font-typewriter text-mob-gold uppercase tracking-widest mb-0.5 leading-none opacity-80">
        {{ member.role }}
      </div>
      <div 
        :class="[
          'font-typewriter text-white uppercase break-words leading-tight',
          isBoss ? 'text-lg' : isSmall ? 'text-[10px]' : 'text-xs'
        ]"
      >
        {{ member.name }}
      </div>
       <!-- Fake Metadata for flavor -->
      <div v-if="!isSmall" class="mt-1 text-[8px] font-mono text-gray-500 tracking-tighter">
         FBI #{{ Math.floor(Math.random() * 900000) + 100000 }}
      </div>
      <!-- Star for Boss (as seen in chart) -->
      <div v-if="isBoss" class="absolute -top-2 -right-2 text-mob-gold text-2xl font-serif">*</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  member: Object,
  isBoss: Boolean,
  isSmall: Boolean
})
</script>
