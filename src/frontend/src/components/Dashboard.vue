<template lang="html">
<div>
  <nav class="nav has-shadow" >
    <div class="nav-left">
      <a class="nav-item is-tab" to="/dashboard">
        Dashboard
      </a>
    </div>
    <div class="nav-right">
      <span class="nav-item">
         <div v-if="userInfo">
           <b>Welcome</b>&nbsp;
           {{ userInfo.username }}
         </div>
      </span>
      <span class="nav-item">
        <a class="button" @click="submit()">Logout</a>
      </span>
    </div>
  </nav>

  <section class="section">
    <div v-if="assets" class="container">
      <div class="panel">
      <p class="panel-heading">Values</p>
      <div class="panel-block">
      <div class="columns">
        <div class="card column">
          <div v-for="(asset, index) in assets">
            <div class="card-image">
              <radial-gauge :value="assets[index]"></radial-gauge>
            </div>
            <div class="content">
              <input v-model="index" class="input" disabled>
              <input v-model="assets[index]" class="input" type="text">
            </div>
          </div>
        </div>
        <!-- <div v-if="assets" class="card column is-half">
          <div v-for="(asset, index) in assets">
            <div class="card-image">
              <radial-gauge :value="assets[index]"></radial-gauge>
            </div>
            <div class="content">
              <input v-model="index" class="input" disabled>
              <input v-model="assets[index]" class="input" type="text" disabled>
            </div>
          </div>
        </div> -->
      </div>
    </div>

      <div class="field is-grouped panel-heading">
        <p class="control">
          <a class="button is-primary" @click="start()"> Start </a>
        </p>
        <p class="control">
          <a class="button is-danger" @click="stop()"> Stop </a>
        </p>
      </div>
    </div>
  </div>
  </section>
</div>
</template>

<script>
import auth from '../services/auth'
import router from '../router'
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data: () => ({
    timer: ''
  }),
  beforeMount() {
      if(auth.checkAuth() == false){
        router.push('/login')
      }
  },
  methods: {
    submit() {
        auth.logout()
      },
    start() {
      clearInterval(this.timer)
      this.timer = setInterval(function () {
        auth.getData();
      }.bind(this), 2000);

    },
    stop() {
      clearInterval(this.timer)
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'getUser',
      assets: 'getAssetsData'
    })
  },
  created () {
    auth.getWhoami()
    // this.start()
  },
  beforeDestroy() {
    clearInterval(this.timer)
  }
}
</script>
