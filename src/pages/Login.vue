<template>
  <div>
    <div class="jumbotron bg-primary text-white text-center">
      <h2 class="lead display-3">SLACKERR</h2>
      <p>Where work happens</p>
    </div>
    <div class="alert alert-info" v-if="loading">Processing..</div>
    <div class="aler alert-danger" v-if="hasErrors">
      <div v-for="error in errors">{{ error }}</div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col text-center">
        <button @click="loginWithGoogle" class="btn btn-outline-danger btn-lg">Login with Google</button>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import auth from 'firebase/auth';
import database from 'firebase/database'
export default {
  name: 'login',
  data() {
    return {
      errors: [],
      loading: false,
      usersRef: firebase.database().ref('users')
    }

  },
  computed: {
    hasErrors() {
      return this.errors.length > 0
    }
  },

  methods: {
    loginWithGoogle() {
      this.loading = true
      this.errors = []
      firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((response) => {

        this.saveUserToUsersRef(response.user)

        this.$store.dispatch('setUser', response.user)
        this.$router.push('/')
      })
      .catch(error => {
        this.errors.push(error.message)
        this.loading = false
        })
    },
    saveUserToUsersRef(user) {
      return this.usersRef.child(user.uid).set({
        name: user.displayName,
        avatar: user.photoURL
        })
    },
  }

}
</script>

<style>
  .btn, .jumbotron {
    border-radius: 0px;
  }
</style>
