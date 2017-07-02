import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { TabsPage } from '../tabs/tabs';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  pin: any;
  actual_pin: any; //0011
  constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController, private storage: Storage) {
    this.storage.get('pin').then((pin) => {
      //console.log('pin : ', pin);
      this.actual_pin = pin;
    });
  }

  public login() {
    if (this.actual_pin == this.pin) {
      //console.log('allowed');    
      this.nav.setRoot(TabsPage);
    } else {
      this.showError("Pin incorrect");
      //console.log('denied');
    }
  }

  showError(text) {
    //this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }
}