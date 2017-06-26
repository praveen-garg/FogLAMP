<template lang="html">
<div>
  <nav class="nav has-shadow" >
    <div class="nav-left">
      <a class="nav-item is-tab" to="/dashboard">
        <i class="fa fa-dashboard"></i> Dashboard
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
    <div class="container">
      <div v-if="assets" class="panel">
        <p class="panel-heading">Values</p>
        <div v-for="(asset, index) in assets" class="panel-block">
           <input v-model="assets[index]" class="input" type="text">
        </div>
        <div class="field is-grouped panel-heading">
          <p class="control">
            <a class="button is-primary"> Start </a>
          </p>
          <p class="control">
            <a class="button is-danger"> Stop </a>
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
  beforeMount() {
      if(auth.checkAuth() == false){
        router.push('/login')
      }
  },
  methods: {
    submit() {
        auth.logout()
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
    auth.getData()
  }
}
</script>
