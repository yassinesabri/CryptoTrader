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
  current_pin:number;

  constructor(private nav: NavController,private storage:Storage, private poloniexService: PoloniexService, public alertCtrl: AlertController,private navCtrl: NavController){
        
        this.storage.ready().then(() => {

       this.storage.get('pin').then((api) => {
         console.log('pin : ', api);
         this.actual_pin = api;
         if(this.actual_pin==null){
     // console.log('I m HEREEEEE !!!!!!');
     this.showPinConfig=false;
    }
    else if(this.actual_pin!=null){
       //console.log('I m HEREEEEE');
      this.showPinConfig=true;
    }
       })
       
     });
    
    
    console.log('settings called');
  }
  showAlert():void{
    console.log("there it is the show "+this.showPinConfig+" and tha ctual pin "+this.actual_pin);
    if((!this.showPinConfig && this.actual_pin==null)){
      this.showPinConfig=true;
      this.newPin=null;
      this.confirmNewPin=null;
    }else if(this.showPinConfig && this.actual_pin!=null){
      
console.log('remove Pin');
      let prompt = this.alertCtrl.create({
      title: 'Pin',
      message: "Enter your current Pin",
      inputs: [
        {
          name: 'pin',
          placeholder: 'current Pin'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log('Saved clicked '+data.pin);
            if(data.pin===this.actual_pin){
              this.storage.ready().then(() => {
              this.storage.remove('pin');
              this.newPin=null;
              this.confirmNewPin=null;
              this.showPinConfig=false;
            });
            }
          }
        }
      ]
    });
    prompt.present();
    }else{
      
    this.storage.ready().then(() => {
       this.storage.remove('pin');
       console.log('remove Pin !!!!'+this.actual_pin);
       this.showPinConfig=false;
       this.newPin=null;
       this.confirmNewPin=null;
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
      this.newPin=null;
      this.confirmNewPin=null;
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