<template lang="html">
  <nav class="navbar navbar-expand-lg navbar-light bg-dark">
    <a class="navbar-brand" href="#">
      <router-link to="/home" class="navbar-item">
       Grha-Verflow
      </router-link>
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav" v-if="!token">
        <li class="nav-item active">
          <a class="nav-link" href="#"><router-link to="/Login">Login</router-link><span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active">
          <a class="nav-link" href="#"><router-link to="/Signup">SignUp</router-link><span class="sr-only">(current)</span></a>
        </li>
      </ul>
      <ul class="navbar-nav" v-else>
        <li class="nav-item active">
          <a class="nav-link" href="#" @click="logout">Logout<span class="sr-only">(current)</span></a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      token: localStorage.getItem('token'),
      stateislogin: false
    }
  },
  methods: {
    logout () {
      this.token = null
      localStorage.clear()
      this.$router.replace('login')
    },
    payloadlogin () {
      if (this.token) {
        this.stateislogin = true
        this.$emit('payloadlogin', this.stateislogin)
      }
    }
  },
  created () {
    localStorage.getItem('token')
  }
}
</script>

<style lang="css">
</style>
