import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  notRegistered = true;
  private swRegistration: ServiceWorkerRegistration;


  constructor() {
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
}
