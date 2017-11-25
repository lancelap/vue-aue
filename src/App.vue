<template>
  <div id="app" class="container">
    <ul class="nav nav-pills">
      <li class="nav-item">
        <router-link :to="'/'" class="nav-link" active-class="active" exact>Home</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{ path: '/filters' }" class="nav-link" active-class="active">Filters</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{ path: '/articles' }" class="nav-link" active-class="active">Articles</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{ path: '/comments' }" class="nav-link" active-class="active">Comments</router-link>
      </li>
    </ul>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

