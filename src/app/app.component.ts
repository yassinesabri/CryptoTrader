import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import {TabsPage} from '../pages/tabs/tabs';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private storage:Storage) {
    platform.ready().then(() => {
      this.storage.get('pin').then((pin) => {
         console.log('load pin : ', pin);
         if(pin == null)
            this.rootPage = TabsPage;
         else
            this.rootPage = LoginPage;
       })
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

    });
  }
}