<template>
  <div class="hero min-h-screen">
    <slot name="image" />
    <div class="hero-overlay bg-opacity-40"></div>
    <div class="hero-content text-center text-neutal-content">
      <slot />
    </div>
  </div>
</template>