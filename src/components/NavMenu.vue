<template>
  <nav class="nav-container">
    <ul class="nav-list">
      <li
          v-for="route in routes"
          :key="route"
          class="nav-item"
      >
        <span
            class="nav-link"
            :class="{ 'active': isActive(route) }"
            @click="goToRoute(route)"
        >
          {{ route }}
        </span>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    routes: Array,
  },
  methods: {
    isActive(route) {
      return this.$route.path === `/${route.toLowerCase()}`;
    },
    goToRoute(route) {
      this.$router.push(`/${route.toLowerCase()}`);
    }
  },
};
</script>

<style>
.nav-container {
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-list {
  display: flex;
  gap: 1.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
  flex-wrap: wrap;
}

.nav-item {
  list-style-type: none;
}

.nav-link {
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  color: rgb(51 51 51);
  transition: color 0.3s, border-bottom 0.3s ease;
}

.nav-link:hover {
  color: #ff6600;
  border-bottom: 2px solid #ff6600;
}

.nav-link.active {
  color: #ff6600;
  font-weight: bold;
  border-bottom: 2px solid #ff6600;
}

@media (max-width: 768px) {
  .nav-container {
    padding: 1rem;
  }

  .nav-list {
    gap: 1rem;
    justify-content: center;
  }

  .nav-link {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .nav-container {
    padding: 0.5rem;
  }

  .nav-list {
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
  }

  .nav-link {
    font-size: 1rem;
    text-align: center;
  }
}
</style>

