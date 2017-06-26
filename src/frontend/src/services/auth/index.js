import router from '../../router'
import axios from 'axios'
import store from '../../store'
// URL and endpoint constants
const API_URL = 'http://localhost:8081/api'
const LOGIN_URL = API_URL + '/auth/login'
const ME_URL = API_URL + '/example/whoami'
const DATA_URL = API_URL + '/example/data'


export default {

  // User object will let us check authentication status
  user: {
    authenticated: false
  },
  // Send a request to the login URL and save the returned JWT
  login(context, creds, redirect_url) {
    // By default, axios serializes JavaScript objects to JSON.
    axios.post(LOGIN_URL, creds)
    .then(response => {
      sessionStorage.setItem('access_token', response.data.access_token)
      this.user.authenticated = true
      // Redirect to a specified route
      if(redirect_url) {
        router.push(redirect_url)
      }
    })
    .catch(e => {
      if (e.response) {
        // The request was made, but the server responded with a status code
        // that falls out of the range of 2xx
        console.log(e.response.data.message)
        context.errorNotifications.push(e.response.data.message)
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', e.message)
        context.errorNotifications.push(e.message)
      }
    })
  },
  getWhoami() {
    axios.get(ME_URL, {headers: this.getAuthHeader()})
    .then(response => {
      return response.data;
    })
    .then(data => {
      store.commit('addUser', data)
    })
    .catch(e => {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', e.message)
    })
  },
  getData() {
    axios.get(DATA_URL, {headers: this.getAuthHeader()})
    .then(response => {
      return response.data;
    })
    .then(data => {
      store.commit('setAssetsData', data)
      console.log('Data', data)
    })
    .catch(e => {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', e.message)
    })
  },
  // To log out, we just need to remove the token
  logout() {
    sessionStorage.removeItem('access_token')
    this.user.authenticated = false
    // on logout reset the store
    store.commit('_reset')
    router.push('/login')
  },

  checkAuth() {
    var jwt = sessionStorage.getItem('access_token')
    if(jwt) {
      this.user.authenticated = true
    }
    else {
      this.user.authenticated = false
    }
    return this.user.authenticated
  },

  // The object to be passed as a header for authenticated requests
  getAuthHeader() {
    return {
      "authorization": sessionStorage.getItem('access_token')
    }
  }
}
