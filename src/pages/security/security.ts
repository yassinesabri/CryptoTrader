import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { PoloniexService } from '../../providers/poloniexService';
import { AlertController } from 'ionic-angular';

@Component({
    selector: 'page-security',
    templateUrl: 'security.html'
})
export class SecurityPage {
    showPinConfig:boolean;
  actual_pin:number;
  newPin:number;
  confirmNewPin:number;
  textActivatePin:string;
  current_pin:number;

  constructor(private nav: NavController,private storage:Storage, private poloniexService: PoloniexService, public alertCtrl: AlertController,private navCtrl: NavController){
        
        this.storage.ready().then(() => {

       this.storage.get('pin').then((api) => {
         console.log('pin : ', api);
         this.actual_pin = api;
         if(this.actual_pin==null){
     // console.log('I m HEREEEEE !!!!!!');
     this.textActivatePin="Activate Pin";
     this.showPinConfig=false;
    }
    else if(this.actual_pin!=null){
       //console.log('I m HEREEEEE');
      this.textActivatePin="Edit Pin";
      this.showPinConfig=true;
    }
       })
       
     });
    
    
    console.log('settings called');
  }
  showAlert():void{

    if((!this.showPinConfig && this.actual_pin==null)){
      this.showPinConfig=true;
    }else{
      console.log('remove Pin');
    this.storage.ready().then(() => {
       this.storage.remove('pin');
       this.showPinConfig=false;
     });
    }
  }
  savePin():void{
    if(this.current_pin!=this.actual_pin && this.actual_pin!=null){
      let alert = this.alertCtrl.create({
      title: 'ERROR !',
      subTitle: 'Thre current Pin is wrong. Try again!',
      buttons: ['OK']
    });
    alert.present();
    }
    else if(this.newPin===this.confirmNewPin){
      this.storage.set('pin',this.newPin);
    console.log('done ',this.newPin);
    //this.navCtrl.setRoot(this.navCtrl.getActive().component);
    }else{
      let alert = this.alertCtrl.create({
      title: 'ERROR !',
      subTitle: 'These pins don\'t match. Try again!',
      buttons: ['OK']
    });
    alert.present();
    }
  }
}