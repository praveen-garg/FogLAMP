<template lang="html">
<section>
  <div class="field">
  <label class="label">Username</label>
  <p class="control has-icons-left">
    <input class="input is-success" type="text" placeholder="username" value="">
    <span class="icon is-small is-left">
      <i class="fa fa-user"></i>
    </span>
  </p>
  </div>
  <div class="field">
  <label class="label">Password</label>
  <p class="control has-icons-left has-icons-right">
    <input class="input is-success" type="text" placeholder="password" value="">
    <span class="icon is-small is-left">
      <i class="fa fa-key"></i>
    </span>
  </p>
  </div>
  <div class="field ">
  <p class="control">
    <button class="button is-primary">Sign up</button>
  </p>
  </div>
</section>
</template>
<script>
export default {
  name: 'Sign up'
}
</script>
