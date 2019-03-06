<template>
<div>
  <single-message></single-message>
  <message-box></message-box>
</div>
</template>

<script>
import SingleMessage from './SingleMessage';
import MessageBox from './MessageBox';
import database from 'firebase/database'

 export default {
  name: 'messages',

  components: {SingleMessage, MessageBox},

  data() {
    return {
      messagesRef: firebase.database().ref('messages')
    }
  }

}


</script>
