<template>
  <div>
    <button @click="openModal" class="btn btn-outline-light">Add Channel</button>

    <div class="mt-4">
        <li v-for="channel in channels" class="list-group-item list-group-item-action channelList" :class="{'active': setActiveChannel(channel)}" @click="changeChannel(channel)">{{ channel.name}}</li>
    </div>

        <div class="modal fade" id="channelModal">
         <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title text-dark">Modal title</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div class="form-group">
                  <input  v-model="new_channel" type="text" id="new_channel" name="new_channel" placeholder="Channel name"class="form-control">
                </div>
                <ul class="list-group" v-if="hasErrors">
                  <li class="list-group-item text-danger" v-for="error in errors">{{ error }}></li>
                </ul>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
              <button @click="addChannel" type="button" class="btn btn-primary">Add Channel</button>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import database from 'firebase/database';
import {mapGetters} from 'vuex';

export default {
  name: 'channels',

  data() {
    return {
      new_channel: '',
      errors: [],
      channelsRef: firebase.database().ref('channels'),
      channels: [],
      channel: null
    }
  },

  computed: {
    ...mapGetters(['currentChannel']),
    hasErrors() {
      return this.errors.length > 0
    }
  },

  methods: {
    openModal() {
      $('#channelModal').appendTo("body").modal('show');
    },

    addChannel() {
      this.errors = []
      let key = this.channelsRef.push().key
      console.log('newly creating channel key: ', key)
      let newChannel = {id: key, name: this.new_channel}
      this.channelsRef.child(key).update(newChannel)
      .then(() => {
        this.new_channel = ''
        $("#channelModal").modal('hide')
      })

      .catch((error) => {
        this.errors.push(error.message)
      })
    },

    addListeners() {
      this.channelsRef.on('child_added', snapshot => {
        this.channels.push(snapshot.val())

        if(this.channels.length > 0) {
          this.channel = this.channels[0]
          this.$store.dispatch("setCurrentChannel", this.channel)
        }
        })
    },
    setActiveChannel(channel) {
      return channel.id === this.currentChannel.id
    },

    changeChannel(channel) {
      this.$store.dispatch("setCurrentChannel", channel)
    },
    detachListeners() {
      this.channelsRef.off()
    }

  },
  mounted() {
    this.addListeners()

  },
  beforeDestroy() {
    this.detachListeners()
  }
}

</script>
<style scoped>
  .list-group-item {
    background: none;
    border: none;
    color: white;
  }
  .list-group-item:hover {
    background: white;
    color: purple;
  }
  .channelList:hover {
    cursor: pointer;
  }


</style>
