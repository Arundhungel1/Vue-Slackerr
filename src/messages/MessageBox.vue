<template>
<div>
  <div class="messageform">
    <form @submit.prevent="sendMessage">
      <div class="input-group mb-3">
        <input v-model.trim="message" name="message" id="message" placeholder="Write away" class="form-control mt-3" autofocus>

          <div class="input-group-append">
            <button @click="sendMessage" class="btn btn-primary mt-3" type="button">&nbsp; Send &nbsp;</button>
          </div>
      </div>
    </form>
  </div>
</div>
</template>

<script>
import {mapGetters}  from 'vuex'
 export default {

  name: 'message-box',

  data() {
    return {
      message: '',
      errors: []
    }
  },

  computed: {
    ...mapGetters(['currentChannel', 'currentUser'])
  },

  methods: {
    sendMessage() {
      let newMessage = {
        content: this.message,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        user: {
          name: this.currentUser.displayName,
          avatar: this.currentUser.photoURL,
          id: this.currentUser.uid
        }
      }
      if(this.currentChannel !== null) {
        if(this.message.length > 0) {
          this.$parent.messagesRef.child(this.currentChannel.id).push().set(newMessage)
          .then(() => {
              this.$nextTick(() => {
                $("html, body").scrollTop($(document).height());
                })
            })
            .catch((error) => {
              this.errors.push(error.message)
            })
            this.message = ''
        }
      }
    }
  }
}



</script>

<style scoped>
    .messageform {
        position: fixed;
        left: 0;
        bottom: 10px;
        width: 65%;
        z-index: 100;
        color: white;
        text-align: center;
        margin-bottom: -18px;
        margin-left: 28%;
    }
    input, button {
        height:50px;
    }

</style>
