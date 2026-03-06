<script lang="ts" setup>
import { useFrontmatter } from 'valaxy'

const fm = useFrontmatter()
</script>

<template>
  <div class="hero-section">
    <div class="hero-container">
      <div class="hero-content">
        <!-- Version badge -->
        <a
          v-if="fm.hero?.badge"
          :href="fm.hero.badge.link || '#'"
          class="hero-badge"
        >
          {{ fm.hero.badge.text }}
        </a>

        <!-- Title -->
        <h1 v-if="fm.hero?.name" class="hero-name">
          <span class="hero-name-brand">{{ fm.hero.name }}</span>
          <template v-if="fm.hero?.text">
            <br>
            <span class="hero-name-text">{{ fm.hero.text }}</span>
          </template>
        </h1>

        <!-- Tagline / Description -->
        <p v-if="fm.hero?.tagline" class="hero-tagline">
          {{ fm.hero.tagline }}
        </p>

        <!-- Action buttons -->
        <div v-if="fm.hero?.actions" class="hero-actions">
          <template v-for="action in fm.hero.actions" :key="action.link">
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
    </div>
  </div>
</template>

<style scoped>
.hero-section {
  padding: 64px 24px 48px;
  text-align: center;
}

.hero-container {
  max-width: 960px;
  margin: 0 auto;
}

.hero-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Version badge */
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 14px;
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

/* Title */
.hero-name {
  font-size: 48px;
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.02em;
  margin-bottom: 16px;
}

.hero-name-brand {
  color: #3451B2;
}

.dark .hero-name-brand {
  color: #8da2de;
}

.hero-name-text {
  color: var(--va-c-text);
}

/* Tagline */
.hero-tagline {
  font-size: 20px;
  font-weight: 500;
  color: var(--va-c-text-lighter, #67676C);
  line-height: 1.6;
  max-width: 560px;
  margin-bottom: 32px;
}

/* Action buttons */
.hero-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

.hero-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 12px 28px;
  border-radius: 20px;
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
  box-shadow: 0 6px 20px rgba(86, 114, 205, 0.25);
  transform: translateY(-1px);
}

.hero-btn-alt {
  background: #F1F1F1;
  color: #3C3C43;
}

.dark .hero-btn-alt {
  background: rgba(255, 255, 255, 0.08);
  color: var(--va-c-text);
}

.hero-btn-alt:hover {
  background: #E8E8E8;
}

.dark .hero-btn-alt:hover {
  background: rgba(255, 255, 255, 0.12);
}

/* Responsive */
@media (max-width: 640px) {
  .hero-section {
    padding: 40px 16px 32px;
  }

  .hero-name {
    font-size: 32px;
  }

  .hero-tagline {
    font-size: 16px;
  }

  .hero-btn {
    padding: 10px 22px;
    font-size: 14px;
  }
}
</style>
