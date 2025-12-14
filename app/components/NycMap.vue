<template>
  <div class="relative w-full aspect-square max-w-[600px] mx-auto select-none border border-mob-gold/10 rounded-lg p-4">
    <svg viewBox="0 0 1000 1000" class="w-full h-full drop-shadow-[0_0_15px_rgba(212,175,55,0.2)] bg-mob-black/50">
      <!-- Debug Grid/Circle to ensure SVG is rendering -->
      <circle cx="500" cy="500" r="2" fill="red" />
      
      <!-- Staten Island (Bottom Left) -->
      <path
        d="M150,800 L300,750 L250,900 L120,850 Z"
        :class="getClasses('Staten Island')"
        @mouseenter="hovered = 'Staten Island'"
        @mouseleave="hovered = null"
        @click="$emit('select', 'Staten Island')"
      />

      <!-- Brooklyn (Bottom Right) -->
      <path
        d="M310,740 L500,700 L600,600 L650,750 L550,950 L350,900 Z"
        :class="getClasses('Brooklyn')"
        @mouseenter="hovered = 'Brooklyn'"
        @mouseleave="hovered = null"
        @click="$emit('select', 'Brooklyn')"
      />

      <!-- Queens (Middle Right) -->
      <path
        d="M510,690 L650,600 L850,550 L950,650 L850,800 L660,760 Z"
        :class="getClasses('Queens')"
        @mouseenter="hovered = 'Queens'"
        @mouseleave="hovered = null"
        @click="$emit('select', 'Queens')"
      />

      <!-- Manhattan (Center Strip) -->
      <path
        d="M320,680 L350,550 L400,350 L450,330 L480,550 L420,700 Z"
        :class="getClasses('Manhattan')"
        @mouseenter="hovered = 'Manhattan'"
        @mouseleave="hovered = null"
        @click="$emit('select', 'Manhattan')"
      />

      <!-- Bronx (Top Right) -->
      <path
        d="M460,320 L600,280 L700,350 L650,550 L500,530 Z"
        :class="getClasses('The Bronx')"
        @mouseenter="hovered = 'The Bronx'"
        @mouseleave="hovered = null"
        @click="$emit('select', 'The Bronx')"
      />
      
      <!-- Labels -->
      <text x="200" y="850" class="fill-white text-[24px] font-serif opacity-70 pointer-events-none">Staten Island</text>
      <text x="450" y="850" class="fill-white text-[24px] font-serif opacity-70 pointer-events-none">Brooklyn</text>
      <text x="750" y="650" class="fill-white text-[24px] font-serif opacity-70 pointer-events-none">Queens</text>
      <text x="350" y="500" class="fill-white text-[24px] font-serif opacity-70 pointer-events-none rotate-[-15deg]">Manhattan</text>
      <text x="550" y="380" class="fill-white text-[24px] font-serif opacity-70 pointer-events-none">The Bronx</text>

    </svg>

    <!-- Hover Tooltip -->
    <div v-if="hovered" class="absolute top-4 left-1/2 -translate-x-1/2 bg-mob-black/95 border border-mob-gold px-6 py-3 rounded text-mob-gold font-serif text-xl tracking-widest backdrop-blur shadow-xl pointer-events-none z-50">
      {{ hovered }}
      <div class="text-xs text-center text-gray-400 font-sans mt-1 uppercase tracking-normal">Controlled by {{ getFamilyName(hovered) }}</div>
    </div>
  </div>
</template>

<script setup>
const hovered = ref(null)
const emit = defineEmits(['select'])

function getClasses(borough) {
  const isHovered = hovered.value === borough
  // Use a visible gray fill by default so it's not invisible against black
  return [
    'stroke-mob-gold stroke-[3] transition-all duration-300 cursor-pointer',
    isHovered 
      ? 'fill-mob-gold/30 filter drop-shadow-[0_0_15px_rgba(212,175,55,0.6)]' 
      : 'fill-gray-800 hover:fill-gray-700' 
  ]
}

function getFamilyName(borough) {
  const map = {
    'Manhattan': 'Genovese',
    'Brooklyn': 'Gambino',
    'Queens': 'Bonanno',
    'The Bronx': 'Lucchese',
    'Staten Island': 'Colombo'
  }
  return map[borough] || 'Unknown'
}
</script>
