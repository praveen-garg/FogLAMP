<template lang="html">
<div id = "root" class="container">
  <section>
    <div class="panel">
      <div class="notification is-danger" v-if="errorNotifications && errorNotifications.length" v-show="isVisible">
        <button class="delete" @click="isVisible = false"></button>
        <ul>
          <li>
            {{ errorNotifications[0] }}
          </li>
        </ul>
      </div>
      <div class="panel-block control">
        <div class="control">
          <div class="field">
            <label class="label">Username</label>
            <p class="control has-icons-left">
              <input v-model="credentials.username" name="username" :class="{'input': true, 'is-danger': validationErrors.has('username') }" type="text" placeholder="username">
              <span v-show="validationErrors.has('username')" class="help is-danger">{{ validationErrors.first('username') }}</span>
              <span class="icon is-small is-left">
                <i class="fa fa-user"></i>
              </span>
            </p>
          </div>
          <div class="field">
            <label class="label">Password</label>
            <p class="control has-icons-left has-icons-right">
              <input v-model="credentials.password" name="password" :class="{'input': true, 'is-danger': validationErrors.has('password') }" type="password" placeholder="password">
              <span v-show="validationErrors.has('password')" class="help is-danger">{{ validationErrors.first('password') }}</span>
              <span class="icon is-small is-left">
                <i class="fa fa-lock"></i>
              </span>
            </p>
          </div>
          <div class="field">
            <p class="has-text">
              <button class="button is-primary" @click="submit()">Login</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
</template>
<script>
import auth from '../auth'
import { Validator } from 'vee-validate';
export default {
  name: 'Login',
  validator: null,
  data: () => ({
    credentials: {
          username: '',
          password: ''
        },
    validationErrors: null,
    isVisible: null,
    errorNotifications : []
  }),
  methods: {
    validateForm() {
      this.validator.validateAll({
        username: this.credentials.username,
        password: this.credentials.password
      });
    },
    submit() {
        var credentials = {
          username: this.credentials.username,
          password: this.credentials.password
        }
        this.validateForm()
        if (!this.validationErrors.any())
          // We need to pass the component's this context
          // to properly make use of http in the auth service
          this.isVisible = true
          auth.login(this, credentials, '/')
      }
  },
  created() {
    this.validator = new Validator({
      username: 'required',
      password: 'required'
    })
    this.$set(this, 'validationErrors', this.validator.errorBag)
  }
}
</script>
