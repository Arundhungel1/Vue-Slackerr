<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-4 sidebar">
          <sidebar></sidebar>
        </div>
        <div class="col-md-8 content">
          <messages></messages>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '../sidebar/Sidebar';
import Messages from '../messages/Messages'


export default {
  name: 'chat',

  components: {Sidebar, Messages}
}
</script>

<style scoped>
    .sidebar {
      width: 23.5%;
      display: block;
      float: left;
      position: fixed;
      height: 100%;
      background: #7f1287;
      padding-top: 2em;
      overflow: scroll;
    }
    .content {
      width: 60%;
      display: block;
      float: left;
      margin-left: 26%;
    }
</style>
