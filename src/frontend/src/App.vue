<template>
  <div id="app">
    <section class="hero is-primary">
      <nav class="main-nav nav has-shadow">
        <div class="nav-left">
          <a class="nav-item">
            <h3>FogLAMP</h3>
          </a>
        </div>
        <div class="nav-center">
          <div class="nav-item content">
            <h2 class="title">
            </h2>
          </div>
        </div>
        <div class="nav-right nav-menu">
          <a class="nav-item">
          </a>
        </div>
      </nav>
    </section>
    <router-view></router-view>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>
