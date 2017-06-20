<template lang="html">
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
      userInfo: 'getUser'
    })
  },
  created () {
    auth.getWhoami()
  }
}
</script>
