import {Component} from '@angular/core';
import {FirebaseApp} from 'angularfire2';
import 'firebase/messaging';

declare var Notification: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  private swRegistration: ServiceWorkerRegistration;
  private firebaseApp;
  private firebaseMessaging;

  public notificationStatus = Notification.permission;

  constructor(firebaseApp:FirebaseApp) {
    this.firebaseApp = firebaseApp;

    if (navigator.serviceWorker && "PushManager" in window) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log(registration);
          this.swRegistration = registration;
        })
        .catch(function (err) {
          console.error('Unable to register service worker.', err);
        });
    }

  }

  public registerForPush() {
      this.initFireBase();
  }


  private initFireBase() {

    console.log("asking for permission");

    this.firebaseMessaging = this.firebaseApp.messaging();

    console.log(this.firebaseMessaging);
    this.firebaseMessaging.useServiceWorker(this.swRegistration);
    this.firebaseMessaging.requestPermission()
      .then(() => {
        console.log('Notification permission granted.');
        this.getToken();
        this.notificationStatus = 'granted';
      })
      .catch((err) => {
        console.error(err);
      });

    this.firebaseMessaging.onTokenRefresh(()=>{
      console.log("token REFRESH");
    })

    this.firebaseMessaging.onMessage((message)=>{
      console.log("MESSAGE ARRIVED");
      console.log(message);
    })
  }

  private getToken(): void {
    console.log("Get token from user");

    this.firebaseMessaging.getToken()
      .then((currentToken) => {
        console.log("got token from user's device");
        console.log(currentToken);
        //TODO: send token to server
      })
      .catch((err) => {
        console.error("token failed");
        console.error(err);

      });
  }


}
