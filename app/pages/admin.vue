<template>
  <div>
    <h1 class="text-4xl text-mob-gold mb-8">Administrative Review</h1>

    <div v-if="pending" class="text-center py-12">Checking secure channels...</div>
    
    <div v-else-if="submissions && submissions.length > 0" class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="border-b border-mob-gold/30 text-xs uppercase tracking-widest text-mob-gold">
            <th class="p-4">Name</th>
            <th class="p-4">Family</th>
            <th class="p-4">Role</th>
            <th class="p-4">Details</th>
            <th class="p-4 text-right">Action</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-white/5">
          <tr v-for="item in submissions" :key="item.id" class="hover:bg-mob-gold/5 transition-colors">
            <td class="p-4 font-serif text-lg">{{ item.name }}</td>
            <td class="p-4 text-gray-400">{{ item.familyId }}</td>
            <td class="p-4 text-gray-400">{{ item.role }}</td>
            <td class="p-4 text-sm text-gray-500 max-w-xs truncate">{{ item.famousFor }}</td>
            <td class="p-4 text-right space-x-2">
              <button @click="process(item.id, 'reject')" class="px-3 py-1 text-xs uppercase tracking-widest text-red-500 hover:text-red-400 border border-red-500/30 hover:border-red-500 rounded transition-colors">
                Reject
              </button>
              <button @click="process(item.id, 'approve')" class="px-3 py-1 text-xs uppercase tracking-widest text-green-500 hover:text-green-400 border border-green-500/30 hover:border-green-500 rounded transition-colors">
                Approve
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="text-center py-20 border border-dashed border-white/10 rounded-lg">
      <p class="text-gray-500 text-xl font-light">No pending submissions awaiting review.</p>
    </div>
  </div>
</template>

<script setup>
const { data: submissions, refresh, pending } = await useFetch('/api/admin/pending')

async function process(id, action) {
  if (!confirm(`Are you sure you want to ${action} this record?`)) return
  
  try {
    await $fetch('/api/admin/approve', {
      method: 'POST',
      body: { id, action }
    })
    refresh()
  } catch (e) {
    alert('Operation failed.')
  }
}

useHead({
  title: 'Admin Console | Omertà'
})
</script>
