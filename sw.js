



importScripts('https://www.gstatic.com/firebasejs/4.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.2.0/firebase-messaging.js');

firebase.initializeApp({messagingSenderId: "785149027944"});
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(message){
  console.log("RECEIVED MESSAGE IN WHEN APP WAS NOT IN FOREGROUND");
  return self.registration.showNotification("MESSAGE");
});





