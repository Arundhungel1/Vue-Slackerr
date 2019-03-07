<template>
<div>
  <div class="mt-3 mb-5">
    <div v-for="message in messages">
      <div class="media">
        <img :src="message.user.avatar" height="50" class="rounded-circle align-self-start mr-3">
        <div class="media-body">
          <h6 class="mt-0">
            <a href="#" class="usernamemsg">{{ message.user.name }}</a>
            <span class="timestap"> {{ message.timestamp | fromNow }} </span>
          </h6>
          <p :class="{'self_message': selfMessage(message.user)}">{{ message.content }}</p>
            <hr style="border: 1px solid #333;">
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>

import moment from 'moment';
import {mapGetters} from 'vuex'

export default {
  name: 'single-message',
  props: ['messages'],

  computed: {
    ...mapGetters(['currentUser'])
  },

  methods: {
    selfMessage(user) {
      return user.id === this.currentUser.uid
    }
  },
  filters: {
    fromNow(value) {
      return moment(value).fromNow()
    }
  }
}


</script>

<style scoped>
.self_message {
  border-left: 5px solid grey;
  padding: 0 10px;
}
.timestap {
  color: grey;
  font-size: 12px;
}
.usernamemsg {
  font-weight: bold;
  font-size: 18px;
}
span {
  padding-left: 10px;
}
</style>
