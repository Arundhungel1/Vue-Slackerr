<template>
  <div>
    <div class="jumbotron bg-primary text-white text-center">
      <h2 class="lead display-3">SLACKERR</h2>
      <p>Where work happens</p>
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
export default {
  name: 'login',

  methods: {
    loginWithGoogle() {
      firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((response) => {
        console.log(response.user)
      })
    }
  }

}
</script>
