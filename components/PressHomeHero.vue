<script lang="ts" setup>
import { useFrontmatter } from 'valaxy'
const fm = useFrontmatter()
</script>

<template>
  <div class="press-home-hero">
    <div class="hero-content">
      <div class="hero-text-area">
        <a v-if="fm.hero?.badge" :href="fm.hero.badge.link || '#'" class="hero-badge">
          {{ fm.hero.badge.text }}
        </a>

        <h1 v-if="fm.hero?.name" class="hero-title">
          <span class="brand-name">{{ fm.hero.name }}</span>
          <br>
          <span class="main-title">{{ fm.hero.text }}</span>
        </h1>

        <p v-if="fm.hero?.tagline" class="hero-tagline">
          {{ fm.hero.tagline }}
        </p>

        <div v-if="fm.hero?.actions" class="hero-actions">
          <template v-for="(action, index) in fm.hero.actions" :key="action.link">
            <AppLink
              :to="action.link"
              class="hero-btn"
              :class="action.theme === 'brand' ? 'hero-btn-brand' : 'hero-btn-alt'"
            >
              {{ action.text }}
            </AppLink>
          </template>
        </div>
      </div>
      
      <div class="hero-image-area">
        <div class="hero-illustration">
          <svg viewBox="0 0 24 24" class="hero-svg">
            <path fill="currentColor" d="M19.35 10.04C18.67 6.59 15.64 4 12 4C9.11 4 6.6 5.64 5.35 8.04C2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5c0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4c0-2.05 1.53-3.76 3.56-3.97l1.07-.11l.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5l1.53.11c1.56.1 2.78 1.41 2.78 2.96c0 1.65-1.35 3-3 3zM14 13h-4v3H8l4 4l4-4h-2v-3z"/>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.press-home-hero {
  padding: 80px 24px 64px;
}

.hero-content {
  max-width: 1152px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 64px;
}

.hero-text-area {
  flex: 1;
  max-width: 640px;
  text-align: left;
}

.hero-image-area {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-illustration {
  width: 100%;
  max-width: 480px;
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #3451B2;
  opacity: 0.9;
}

.hero-svg {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 20px 40px rgba(52, 81, 178, 0.2));
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 16px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 500;
  color: #5672CD;
  background: rgba(86, 114, 205, 0.08);
  border: 1px solid rgba(86, 114, 205, 0.2);
  text-decoration: none;
  margin-bottom: 24px;
  transition: all 0.2s;
}

.hero-badge:hover {
  background: rgba(86, 114, 205, 0.14);
  border-color: rgba(86, 114, 205, 0.3);
}

.hero-title {
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.02em;
  margin-bottom: 24px;
}

.brand-name {
  color: #3451B2;
  font-size: 56px;
  display: block;
}

.dark .brand-name {
  color: #6481EA;
}

.main-title {
  color: #3C3C43;
  font-size: 48px;
  display: block;
  margin-top: 8px;
}

.dark .main-title {
  color: rgba(255, 255, 255, 0.9);
}

.hero-tagline {
  font-size: 20px;
  font-weight: 500;
  color: #67676C;
  line-height: 1.6;
  margin-bottom: 32px;
  max-width: 560px;
}

.dark .hero-tagline {
  color: rgba(235, 235, 245, 0.6);
}

.hero-actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.hero-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 28px;
  border-radius: 999px;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.25s;
}

.hero-btn-brand {
  background: #5672CD;
  color: #fff;
}

.hero-btn-brand:hover {
  background: #4a63b8;
}

.dark .hero-btn-brand {
  background: #5672CD;
}

.dark .hero-btn-brand:hover {
  background: #6481ea;
}

.hero-btn-alt {
  background: #F1F1F1;
  color: #3C3C43;
}

.hero-btn-alt:hover {
  background: #E8E8E8;
}

.dark .hero-btn-alt {
  background: rgba(255, 255, 255, 0.08);
  color: #efefef;
}

.dark .hero-btn-alt:hover {
  background: rgba(255, 255, 255, 0.15);
}

@media (max-width: 960px) {
  .hero-content {
    flex-direction: column;
    text-align: center;
    gap: 32px;
  }
  .hero-text-area {
    text-align: center;
  }
  .hero-actions {
    justify-content: center;
  }
  .hero-image-area {
    width: 100%;
    max-width: 320px;
  }
  .brand-name {
    font-size: 48px;
  }
  .main-title {
    font-size: 40px;
  }
}

@media (max-width: 640px) {
  .press-home-hero {
    padding: 48px 16px 32px;
  }
  .brand-name {
    font-size: 40px;
  }
  .main-title {
    font-size: 32px;
  }
  .hero-tagline {
    font-size: 16px;
  }
  .hero-btn {
    padding: 10px 24px;
    font-size: 15px;
  }
}
</style>
