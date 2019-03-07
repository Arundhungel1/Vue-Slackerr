// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import firebase from 'firebase/app';
import store from './store';
import auth from 'firebase/auth';


Vue.config.productionTip = false

var config = {
    apiKey: "AIzaSyBNv-jRPPuzdo-dbYVsPyDh-kWUTyewnRs",
    authDomain: "myvueslack.firebaseapp.com",
    databaseURL: "https://myvueslack.firebaseio.com",
    projectId: "myvueslack",
    storageBucket: "myvueslack.appspot.com",
    messagingSenderId: "611858330376"
  };
  firebase.initializeApp(config);

  window.firebase = firebase;
  const unsubscribe = firebase.auth().onAuthStateChanged(user => {
    store.dispatch('setUser', user)

    new Vue({
     el: '#app',
     router,
     store,
     components: { App },
     template: '<App/>'
    });
   unsubscribe()

})
 /* eslint-disable no-new */
