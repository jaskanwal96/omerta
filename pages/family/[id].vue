<template>
  <div v-if="family">
    <div class="mb-8">
      <NuxtLink to="/" class="text-mob-gold text-xs uppercase tracking-widest hover:text-white transition-colors">
        ← Back to Archives
      </NuxtLink>
    </div>

    <!-- Header -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
      <div class="lg:col-span-1">
        <div class="relative rounded-lg overflow-hidden border border-mob-gold/30 gold-glow">
          <img :src="family.imageUrl" :alt="family.name" class="w-full object-cover aspect-[3/4] grayscale hover:grayscale-0 transition-all duration-700">
          <div class="absolute inset-0 border-[12px] border-mob-black/20 pointer-events-none"></div>
        </div>
      </div>
      
      <div class="lg:col-span-2 flex flex-col justify-center">
        <h1 class="text-5xl md:text-7xl mb-4 gold-gradient-text">{{ family.name }}</h1>
        <div class="flex items-center gap-6 text-sm uppercase tracking-widest text-mob-gold mb-8">
          <span>Est. {{ family.founded }}</span>
          <span class="w-1 h-1 bg-gray-500 rounded-full"></span>
          <span>{{ family.city }}</span>
        </div>
        
        <div class="bg-mob-gray/50 p-8 rounded-sm border-l-2 border-mob-gold backdrop-blur-sm">
          <h3 class="text-xl mb-4 text-white font-serif">Family History</h3>
          <p class="text-gray-300 leading-relaxed font-light text-lg">{{ family.description }}</p>
        </div>
      </div>
    </div>

    <!-- Members Roster -->
    <div class="mb-12 flex items-center justify-between border-b border-mob-gold/10 pb-4">
      <h2 class="text-3xl text-mob-gold">Known Associaties</h2>
      <NuxtLink to="/submit" class="bg-mob-gold/10 hover:bg-mob-gold/20 text-mob-gold px-4 py-2 rounded text-xs uppercase tracking-widest border border-mob-gold/30 transition-all">
        Report New Member
      </NuxtLink>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <div v-for="member in family.members" :key="member.id" class="group bg-mob-gray p-6 rounded border border-mob-gray hover:border-mob-gold/50 transition-all hover:-translate-y-1">
        <div class="flex gap-4">
          <img :src="member.imageUrl || 'https://via.placeholder.com/150'" class="w-20 h-20 object-cover rounded-sm grayscale group-hover:grayscale-0 transition-all" alt="">
          <div>
            <span class="text-xs text-mob-gold uppercase tracking-widest block mb-1">{{ member.role }}</span>
            <h3 class="text-xl font-serif text-white mb-1">{{ member.name }}</h3>
            <p class="text-xs text-gray-500">{{ member.yearsActive }}</p>
          </div>
        </div>
        <div class="mt-4 pt-4 border-t border-white/5">
          <p class="text-sm text-gray-400 font-light italic">"{{ member.famousFor }}"</p>
        </div>
      </div>
      
      <div v-if="family.members.length === 0" class="col-span-full py-12 text-center text-gray-500 italic">
        No known made men in the database yet.
      </div>
    </div>
  </div>
  
  <div v-else class="py-20 text-center">
    <div v-if="pending">Loading confidential data...</div>
    <div v-else>Family not found in the archives.</div>
  </div>
</template>

<script setup>
const route = useRoute()
const { data: families, pending } = await useFetch('/api/families')

const family = computed(() => {
  if (!families.value) return null
  return families.value.find(f => f.id === route.params.id)
})

useHead({
  title: computed(() => family.value ? `${family.value.name} | Omertà` : 'Loading...'),
})
</script>
