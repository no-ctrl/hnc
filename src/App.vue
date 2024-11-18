<template>
  <div class="app-container">
    <header class="header-container">
      <div class="container flex items-center justify-between">
        <router-link to="/" class="logo">
          <span class="logo-icon">Y</span>
          <span class="logo-text">Hacker News</span>
        </router-link>

        <NavMenu :routes="['top', 'new', 'best', 'ask', 'show', 'jobs']"/>

        <SearchBar></SearchBar>
      </div>
    </header>

    <!-- Main Content Section -->
    <main class="main-content">
      <router-view/>
    </main>
  </div>
</template>

<script>
import NavMenu from "@/components/NavMenu.vue";
import SearchBar from "@/components/SearchBar.vue";

export default {
  components: {
    SearchBar,
    NavMenu,
  },
  data() {
    return {
      searchQuery: "",
    };
  },
};
</script>

<style scoped>
.app-container {
  font-family: 'Courier New', Courier, monospace;
  margin: 0;
  min-height: 100vh;
}

.header-container {
  background: white;
  padding: 15px 0;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  flex-wrap: wrap;
}

.logo {
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  color: #ff6600;
  text-decoration: none;
}

.logo-icon {
  background-color: #ff6600;
  color: #fff;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  font-size: 16px;
  margin-right: 10px;
}

.logo-text {
  color: #52524d;
  font-size: 20px;
}

/* Navigation Menu */
nav {
  display: flex;
  gap: 20px;
}

nav a {
  font-size: 14px;
  font-weight: bold;
  padding: 6px 12px;
  border-radius: 3px;
  color: #f8f8f2;
  text-decoration: none;
  transition: background-color 0.3s ease-in-out;
}

nav a:hover {
  background-color: rgba(255, 102, 0, 0.1);
}

/* Main Content Section */
.main-content {
  padding: 20px;
  max-width: 1100px;
  margin: 0 auto;
}

/* Search Bar Styles */
.search-bar {

  border: 1px solid #ff6600;
  color: #f8f8f2;
  padding: 5px 10px;
  border-radius: 5px;

}

.search-bar input {
  background: transparent;
  border: none;
  outline: none;
  color: #f8f8f2;
  width: 80%;
  font-size: 14px;
  padding: 5px;
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .header-container {
    flex-direction: column;
    padding: 15px;
  }

  .logo {
    margin-bottom: 10px;
  }

  nav {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    width: 100%;
  }

  .search-bar {
  //width: 100%; margin-top: 10px;
  }
}

/* Mobile-First Design for smaller screens */
@media (max-width: 480px) {
  .logo-text {
    font-size: 16px;
  }

  .logo-icon {
    width: 24px;
    height: 24px;
    font-size: 14px;
  }

  nav a {
    font-size: 12px;
    padding: 8px 10px;
  }
}
</style>
