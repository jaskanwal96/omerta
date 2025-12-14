<template>
  <div class="w-full max-w-[1000px] mx-auto h-[600px] border border-mob-gold/20 rounded-lg overflow-hidden bg-[#0a0a0a] relative z-0">
    <div v-if="loading" class="w-full h-full flex items-center justify-center text-mob-gold font-typewriter animate-pulse">
        ESTABLISHING SECURE CONNECTION...
    </div>
    
    <ClientOnly>
      <l-map v-if="isMounted" ref="map" :zoom="10" :center="[40.7128, -74.0060]" :options="{ zoomControl: false }">
        
        <!-- Dark Matter Tiles -->
        <l-tile-layer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          layer-type="base"
          name="Stamen Toner"
          :attribution="attribution"
        />

        <!-- GEOJSON LAYER -->
        <l-geo-json 
          v-if="geoJsonData"
          :geojson="geoJsonData"
          :options="geoJsonOptions"
        />

      </l-map>
    </ClientOnly>

    <div class="absolute top-4 left-4 z-[1000] pointer-events-none">
       <div class="text-mob-gold font-typewriter text-2xl drop-shadow-md bg-mob-black/50 px-2 rounded">
          NYC SURVEILLANCE MAP
       </div>
    </div>
    
    <!-- Hover Label Overlay -->
    <div v-if="hovered" class="absolute bottom-6 right-6 z-[1000] pointer-events-none">
       <div class="bg-mob-black/90 border border-mob-gold px-6 py-4 rounded shadow-2xl backdrop-blur-sm">
          <div class="text-mob-gold font-typewriter text-3xl uppercase tracking-widest">{{ hovered }}</div>
          <div class="w-full h-px bg-mob-gold/30 my-2"></div>
          <div class="text-gray-400 font-sans text-xs uppercase tracking-wider mb-1">Under Control Of</div>
          <div class="text-white font-serif text-xl">{{ familyMap[hovered] }}</div>
       </div>
    </div>

  </div>
</template>

<script setup>
import { LMap, LTileLayer, LGeoJson } from '@vue-leaflet/vue-leaflet'
import 'leaflet/dist/leaflet.css'

const isMounted = ref(false)
const loading = ref(true)
const geoJsonData = ref(null)
const hovered = ref(null)
const emit = defineEmits(['select'])
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'

const familyMap = {
    'Manhattan': 'Genovese',
    'Brooklyn': 'Gambino',
    'Queens': 'Bonanno',
    'The Bronx': 'Lucchese',
    'Staten Island': 'Colombo'
}

// Leaflet L object, loaded dynamically
let L = null

onMounted(async () => {
    // Dynamic import to avoid SSR issues
    const leaf = await import('leaflet')
    L = leaf.default || leaf
    
    // Fix default icon (standard procedure)
    delete L.Icon.Default.prototype._getIconUrl
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: '',
        iconUrl: '',
        shadowUrl: ''
    })

    // Fetch GeoJSON
    try {
        const response = await fetch('https://raw.githubusercontent.com/codeforgermany/click_that_hood/main/public/data/new-york-city-boroughs.geojson')
        geoJsonData.value = await response.json()
    } catch (e) {
        console.error('Failed to load map data', e)
    } finally {
        isMounted.value = true
        loading.value = false
    }
})

const geoJsonOptions = computed(() => {
    if (!L) return {}
    return {
        style: (feature) => {
            const name = feature.properties.name
            const isHovered = hovered.value === name
            return {
                color: '#d4af37', // Gold stroke
                weight: isHovered ? 2 : 1,
                opacity: 1,
                fillColor: isHovered ? '#d4af37' : '#1a1a1a', // Gold fill on hover, dark gray otherwise
                fillOpacity: isHovered ? 0.3 : 0.1
            }
        },
        onEachFeature: (feature, layer) => {
            const name = feature.properties.name
            
            layer.on({
                mouseover: (e) => {
                    hovered.value = name
                    e.target.setStyle({
                        weight: 2,
                        fillColor: '#d4af37',
                        fillOpacity: 0.3
                    })
                },
                mouseout: (e) => {
                    hovered.value = null
                    // Reset style handled by reactivity if we re-render, 
                    // but usually direct style manipulation is performant in Leaflet
                    e.target.setStyle({
                        weight: 1,
                        fillColor: '#1a1a1a',
                        fillOpacity: 0.1
                    })
                },
                click: () => {
                    emit('select', name)
                }
            })
        }
    }
})
</script>

<style>
/* Clean up Leaflet attribution for cleaner look if desired, but good to keep for attribution */
.leaflet-control-attribution {
    background: rgba(0,0,0,0.5) !important;
    color: #888 !important;
}
.leaflet-control-attribution a {
    color: #aaa !important;
}
</style>
