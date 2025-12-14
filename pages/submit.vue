<template>
  <div class="max-w-2xl mx-auto">
    <div class="mb-12 text-center">
      <h1 class="text-4xl md:text-5xl mb-4 text-mob-gold">Submit Intelligence</h1>
      <p class="text-gray-400">Add a new associate to the archives. All submissions are subject to review.</p>
    </div>

    <form @submit.prevent="submitMember" class="bg-mob-gray p-8 rounded-lg border border-mob-gold/20 relative overflow-hidden">
      <!-- Success Overlay -->
      <div v-if="success" class="absolute inset-0 bg-mob-gray/95 z-10 flex flex-col items-center justify-center text-center p-8 backdrop-blur">
        <div class="w-16 h-16 rounded-full border-2 border-green-500 flex items-center justify-center mb-4 text-green-500 text-2xl">✓</div>
        <h2 class="text-2xl text-white mb-2">Submission Received</h2>
        <p class="text-gray-400 mb-6">The Commission will review your submission shortly.</p>
        <button @click="resetForm" class="px-6 py-2 bg-mob-gold text-mob-black font-bold uppercase text-sm tracking-widest rounded hover:bg-white transition-colors">
          Submit Another
        </button>
      </div>

      <div class="space-y-6">
        <div>
          <label class="block text-xs uppercase tracking-widest text-mob-gold mb-2">Full Name</label>
          <input v-model="form.name" type="text" required class="w-full bg-mob-black border border-white/10 p-3 text-white focus:border-mob-gold outline-none transition-colors rounded-sm" placeholder="e.g. Bugsy Siegel">
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-xs uppercase tracking-widest text-mob-gold mb-2">Family</label>
            <select v-model="form.familyId" required class="w-full bg-mob-black border border-white/10 p-3 text-white focus:border-mob-gold outline-none transition-colors rounded-sm appearance-none">
              <option value="" disabled>Select Family</option>
              <option v-for="f in families" :key="f.id" :value="f.id">{{ f.name }}</option>
            </select>
          </div>
          <div>
            <label class="block text-xs uppercase tracking-widest text-mob-gold mb-2">Rank / Role</label>
            <select v-model="form.role" required class="w-full bg-mob-black border border-white/10 p-3 text-white focus:border-mob-gold outline-none transition-colors rounded-sm appearance-none">
               <option>Boss</option>
               <option>Underboss</option>
               <option>Consigliere</option>
               <option>Capo</option>
               <option>Soldier</option>
               <option>Associate</option>
            </select>
          </div>
        </div>

        <div>
          <label class="block text-xs uppercase tracking-widest text-mob-gold mb-2">Years Active</label>
          <input v-model="form.yearsActive" type="text" class="w-full bg-mob-black border border-white/10 p-3 text-white focus:border-mob-gold outline-none transition-colors rounded-sm" placeholder="e.g. 1920-1945">
        </div>

        <div>
          <label class="block text-xs uppercase tracking-widest text-mob-gold mb-2">Image URL</label>
          <input v-model="form.imageUrl" type="url" class="w-full bg-mob-black border border-white/10 p-3 text-white focus:border-mob-gold outline-none transition-colors rounded-sm" placeholder="https://...">
        </div>

        <div>
          <label class="block text-xs uppercase tracking-widest text-mob-gold mb-2">Notorious For</label>
          <textarea v-model="form.famousFor" rows="3" class="w-full bg-mob-black border border-white/10 p-3 text-white focus:border-mob-gold outline-none transition-colors rounded-sm" placeholder="Brief description of their crimes or role..."></textarea>
        </div>

        <div class="pt-4">
          <button type="submit" :disabled="submitting" class="w-full bg-mob-gold text-mob-black font-bold uppercase text-sm tracking-widest py-4 hover:bg-white transition-colors disabled:opacity-50">
            {{ submitting ? 'Transmitting...' : 'Submit to Archives' }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
const { data: families } = await useFetch('/api/families')

const form = reactive({
  name: '',
  familyId: '',
  role: 'Soldier',
  yearsActive: '',
  imageUrl: '',
  famousFor: ''
})

const submitting = ref(false)
const success = ref(false)

async function submitMember() {
  submitting.value = true
  try {
    await $fetch('/api/members', {
      method: 'POST',
      body: form
    })
    success.value = true
  } catch (e) {
    alert('Failed to submit. Please try again.')
  } finally {
    submitting.value = false
  }
}

function resetForm() {
  success.value = false
  form.name = ''
  form.yearsActive = ''
  form.imageUrl = ''
  form.famousFor = ''
  // keep family/role as nice UX
}

useHead({
  title: 'Submit Member | Omertà'
})
</script>
