<template>
  <div class="not-found">
    <h1>404 - Page Not Found</h1>
    <p>The page you are looking for does not exist.</p>
    <router-link to="/" class="back-home">Go back to Home</router-link>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style scoped>
.not-found {
  text-align: center;
  margin-top: 50px;
}

.not-found h1 {
  font-size: 2.5rem;
  color: #ff6600;
}

.not-found p {
  margin: 1rem 0;
  color: #555;
}

.back-home {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #ff6600;
  color: #fff;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s;
}

.back-home:hover {
  background-color: #ff8533;
}
</style>
