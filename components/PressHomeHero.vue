<script lang="ts" setup>
import { useFrontmatter } from 'valaxy'

const fm = useFrontmatter()
</script>

<template>
  <div class="hero-section">
    <div class="hero-content">
      <h1 v-if="fm.hero?.name" class="hero-name">
        {{ fm.hero.name }}
      </h1>
      <p v-if="fm.hero?.text" class="hero-text">
        {{ fm.hero.text }}
      </p>
      <p v-if="fm.hero?.tagline" class="hero-tagline">
        {{ fm.hero.tagline }}
      </p>
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
</template>

<style scoped>
.hero-section {
  padding: 48px 24px 40px;
  text-align: center;
  max-width: 700px;
  margin: 0 auto;
}

.hero-name {
  font-size: 3rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.1;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 12px;
}

.hero-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--va-c-text);
  margin-bottom: 8px;
  line-height: 1.3;
}

.hero-tagline {
  font-size: 1.1rem;
  color: var(--va-c-text-lighter);
  line-height: 1.5;
  margin-bottom: 28px;
}

.hero-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

.hero-btn {
  display: inline-block;
  padding: 10px 24px;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;
}

.hero-btn-brand {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: #fff;
}

.hero-btn-brand:hover {
  opacity: 0.9;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

.hero-btn-alt {
  background: var(--va-c-bg-soft);
  color: var(--va-c-text);
  border: 1px solid var(--va-c-divider);
}

.hero-btn-alt:hover {
  border-color: var(--va-c-text-lighter);
}

@media (max-width: 640px) {
  .hero-section {
    padding: 32px 16px 24px;
  }

  .hero-name {
    font-size: 2.2rem;
  }

  .hero-text {
    font-size: 1.2rem;
  }

  .hero-tagline {
    font-size: 1rem;
  }
}
</style>
