import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  public keyAvailable: boolean;
  public apiKey: string;
  public secretKey: string;
  constructor(public navCtrl: NavController, public storage: Storage) {
    this.storage.ready().then(() => {
      this.storage.get('apiKey').then((val) => {
        this.apiKey = val;
      })
      this.storage.get('secretKey').then((val) => {
        this.secretKey = val;
      })
      console.log('first get : '+this.apiKey+this.secretKey);
    });
    if(this.apiKey==undefined && this.secretKey == undefined ){
        console.log('undefined state');
        this.storage.ready().then(() => {
          this.storage.set('apiKey', 'default');
          this.storage.set('secretKey', 'default');
          this.keyAvailable = false;
      });
      console.log('first set : '+this.apiKey+this.secretKey);
    }
    if(this.apiKey=='default' && this.secretKey == 'default' ){
      this.keyAvailable = true;
    }
    console.log('status :'+this.keyAvailable);
  }

}
