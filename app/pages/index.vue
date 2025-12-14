<template>
  <div>
    <section class="mb-20 text-center relative">
      <div class="absolute inset-0 bg-gradient-to-b from-mob-gold/5 via-transparent to-transparent blur-3xl -z-10 opacity-30"></div>
      <h1 class="text-6xl md:text-8xl mb-6 tracking-tighter drop-shadow-lg">
        The Families
      </h1>
      <p class="text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
        A confidential dossier of the most powerful organizations in American history. 
      </p>
       <div class="text-mob-gold italic">Viewer discretion is advised.</div>
    </section>

    <div v-if="pending" class="flex justify-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-mob-gold"></div>
    </div>

    <div v-else>
      <!-- Map Section -->
       <div class="mt-24">
          <h2 class="text-3xl text-center mb-8 text-mob-gold font-serif tracking-widest">Territorial Control</h2>
          <NycMap @select="handleBoroughSelect" />
       </div>

      <!-- Family Grid -->
      <h2 class="text-3xl text-center mb-12 text-mob-gold font-serif tracking-widest">The Syndicate Dossiers</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <NuxtLink 
          v-for="family in families" 
          :key="family.id" 
          :to="`/family/${family.id}`"
          class="mob-card group relative overflow-hidden"
        >
          <div class="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-10 transition-opacity duration-700" :style="`background-image: url(${family.imageUrl})`"></div>
          <div class="absolute inset-0 bg-gradient-to-t from-mob-black via-mob-black/80 to-transparent"></div>
          
          <div class="relative z-10 h-full flex flex-col">
            <div class="mb-4 pt-4">
               <h2 class="text-3xl mb-1 group-hover:translate-x-1 transition-transform duration-300">{{ family.name }}</h2>
               <p class="text-xs text-mob-gold uppercase tracking-widest">{{ family.city }}</p>
            </div>
            
            <div class="mt-auto">
               <div class="w-12 h-0.5 bg-mob-gold/50 mb-4 group-hover:w-full transition-all duration-500"></div>
               <p class="text-gray-400 text-sm line-clamp-3 mb-4 font-light">{{ family.description }}</p>
               <div class="flex items-center text-xs text-mob-gold uppercase tracking-widest gap-2">
                  <span>View Dossier</span>
                  <span class="group-hover:translate-x-2 transition-transform">→</span>
               </div>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const { data: families, pending } = await useFetch('/api/families')
const router = useRouter()

function handleBoroughSelect(borough) {
  const map = {
    'Manhattan': 'genovese',
    'Brooklyn': 'gambino',
    'Queens': 'bonanno',
    'The Bronx': 'lucchese',
    'Staten Island': 'colombo'
  }
  const familyId = map[borough]
  if (familyId) {
    router.push(`/family/${familyId}`)
  }
}

useHead({
  title: 'Home | Omertà Archives',
  meta: [
    { name: 'description', content: 'Explore the history of the major American Mafia families.' }
  ]
})
</script>
