<template>
  <div class="min-h-screen bg-mob-black text-gray-200 font-sans selection:bg-mob-gold selection:text-mob-black flex flex-col">
    <header class="border-b border-mob-gold/20 bg-mob-black/95 backdrop-blur sticky top-0 z-50">
      <div class="container mx-auto px-4 h-20 flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-3 group">
          <div class="w-10 h-10 border border-mob-gold rounded-full flex items-center justify-center group-hover:bg-mob-gold/10 transition-colors">
            <span class="font-serif text-2xl text-mob-gold">M</span>
          </div>
          <span class="font-serif text-xl tracking-widest text-mob-gold uppercase">Omertà</span>
        </NuxtLink>

        <nav class="hidden md:flex items-center gap-8">
          <NuxtLink to="/" class="text-sm uppercase tracking-widest hover:text-mob-gold transition-colors">Families</NuxtLink>
          <NuxtLink to="/submit" class="text-sm uppercase tracking-widest hover:text-mob-gold transition-colors">Submit Member</NuxtLink>
          <NuxtLink to="/admin" class="text-sm uppercase tracking-widest hover:text-mob-gold transition-colors">Admin</NuxtLink>
        </nav>

        <!-- Mobile Menu Button (omitted for brevity, can add if needed) -->
      </div>
    </header>

    <main class="flex-grow container mx-auto px-4 py-12">
      <slot />
    </main>

    <footer class="border-t border-mob-gold/10 py-8 mt-auto">
      <div class="container mx-auto px-4 text-center text-gray-600 text-xs uppercase tracking-widest">
        &copy; {{ new Date().getFullYear() }} Omertà Archives. Strictly Confidential.
      </div>
    </footer>
  </div>
</template>
