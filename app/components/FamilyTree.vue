<template>
  <div class="overflow-x-auto pb-24 pt-12 bg-[#111] border-4 border-double border-mob-gold/20 rounded">
    <!-- Header Stamp -->
    <div class="absolute top-4 left-6 text-mob-gold/20 font-typewriter text-4xl -rotate-12 pointer-events-none select-none">
       CONFIDENTIAL
    </div>

    <div class="min-w-[1000px] flex flex-col items-center">
      
      <!-- Level 1: Boss -->
      <div v-if="tree.boss" class="relative flex flex-col items-center mb-16">
        <div class="flex items-start gap-24 relative">
           <MemberNode :member="tree.boss" is-boss />
           
           <!-- Consigliere Link (Side Branch) -->
           <div v-if="tree.consigliere" class="absolute left-full top-8 ml-8 flex items-center">
              <div class="w-12 border-t-2 border-mob-gold/50"></div>
              <div class="ml-4">
                  <MemberNode :member="tree.consigliere" />
              </div>
           </div>
        </div>
        <!-- Connector to Underboss -->
        <div v-if="tree.underboss" class="h-16 w-0.5 bg-mob-gold/50"></div>
      </div>

      <!-- Level 2: Underboss -->
      <div v-if="tree.underboss" class="relative flex flex-col items-center mb-16">
        <MemberNode :member="tree.underboss" />
        <!-- Connector to Capos -->
        <div v-if="tree.capos && tree.capos.length" class="h-16 w-0.5 bg-mob-gold/50"></div>
      </div>

      <!-- Level 3: Capos -->
      <div v-if="tree.capos && tree.capos.length" class="relative flex justify-center gap-12 w-full px-12">
        <!-- Horizontal bar connecting all capos -->
        <div class="absolute -top-0 left-0 right-0 border-t-2 border-mob-gold/50 mx-24"></div> 
        <!-- The mx (margin-x) above needs to be calculated or roughly aligned so the bar covers the first to last capo. 
             Ideally we'd use a Grid or Flex approach where logical connectors are drawn. 
             For simplicity, we'll draw T-shapes on each Capo.
        -->
         
         <div v-for="(capo, idx) in tree.capos" :key="capo.data.id" class="relative flex flex-col items-center pt-8">
            <!-- Vertical up to the horizontal bar -->
            <div class="absolute top-0 h-8 w-0.5 bg-mob-gold/50"></div>
            
            <MemberNode :member="capo.data" />
            
            <!-- Soldiers under Capo -->
            <div v-if="capo.children && capo.children.length" class="mt-8 flex flex-col items-center gap-6 relative">
                <!-- Line down from Capo -->
                <div class="h-8 w-0.5 bg-mob-gold/50 absolute -top-8"></div>
                
                <!-- Use a vertical list for soldiers under a capo (common in these charts) or a mini-grid -->
                <div class="grid grid-cols-1 gap-4 border-l-2 border-mob-gold/20 pl-4 py-2">
                     <MemberNode v-for="soldier in capo.children" :key="soldier.data.id" :member="soldier.data" is-small />
                </div>
            </div>
         </div>
      </div>

      <!-- Catch-all for others -->
      <div v-if="tree.others && tree.others.length" class="mt-24 border-t-2 border-dashed border-mob-gold/20 pt-8 w-11/12 mx-auto">
         <h4 class="text-center text-mob-gold font-typewriter text-xl mb-8 tracking-widest">ASSOCIATES & SOLDIERS (UNATTACHED)</h4>
         <div class="flex flex-wrap justify-center gap-8">
            <MemberNode v-for="m in tree.others" :key="m.id" :member="m" is-small />
         </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import MemberNode from './MemberNode.vue'

const props = defineProps({
  members: {
    type: Array,
    required: true
  }
})

// Transform flat list to strictly typed role-based tree for visual simplicity
// Real tree recursion is hard with random roles, so we map to the "Classic" structure: Boss -> Underboss -> Capo -> Soldier
const tree = computed(() => {
  const boss = props.members.find(m => m.role.toLowerCase() === 'boss')
  const consigliere = props.members.find(m => m.role.toLowerCase() === 'consigliere')
  const underboss = props.members.find(m => m.role.toLowerCase() === 'underboss')
  
  // Get Capos
  const caposRaw = props.members.filter(m => m.role.toLowerCase() === 'capo')
  const capos = caposRaw.map(c => ({
      data: c,
      children: props.members.filter(m => (m.reportsTo === c.id) || (m.role.toLowerCase() === 'soldier' && !m.reportsTo && c.id === caposRaw[0].id)) 
      // ^ Logic hack: if soldier has no boss, assign to first capo for demo, or better: only assign if ID matches
      // Let's do strict matching only for now to encourage good data
  }))

  // Strictly matched soldiers
  capos.forEach(c => {
      c.children = props.members.filter(m => m.reportsTo === c.data.id)
  })

  // Everyone else not in the main structure
  const usedIds = new Set([
      boss?.id, 
      consigliere?.id, 
      underboss?.id, 
      ...capos.map(c => c.data.id),
      ...capos.flatMap(c => c.children.map(s => s.id))
  ].filter(Boolean))

  const others = props.members.filter(m => !usedIds.has(m.id))

  return {
    boss,
    consigliere,
    underboss,
    capos,
    others
  }
})
</script>
