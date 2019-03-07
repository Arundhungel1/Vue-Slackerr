<template>
<div>
  <single-message :messages="messages"></single-message>
  <message-box></message-box>
</div>
</template>

<script>
import SingleMessage from './SingleMessage';
import MessageBox from './MessageBox';
import database from 'firebase/database';
import {mapGetters} from 'vuex'

 export default {
  name: 'messages',

  components: {SingleMessage, MessageBox},

  data() {
    return {
      messagesRef: firebase.database().ref('messages'),
      messages: [],
      channel: ''
    }
  },
  computed: {
    ...mapGetters(['currentChannel'])
  },

  watch: {
    currentChannel: function() {
      this.messages = []
      this.addListeners()
      this.channel = this.currentChannel
    }
  },
  methods: {
    addListeners() {
      this.messagesRef.child(this.currentChannel.id).on('child_added', (snapshot) => {
        this.messages.push(snapshot.val())

        this.$nextTick(() => {
          $("html, body").scrollTop($(document).height());
          })
        })
    },

    detachListeners() {
      if(this.channel !== null) {
        this.messagesRef.child(this.channel.id).off()
      }
    }
  },
  beforeDestroy() {
    this.detachListeners()
  }

}


</script>
