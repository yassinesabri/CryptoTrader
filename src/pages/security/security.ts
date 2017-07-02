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
           this.showPinConfig=false;
         }
        else if(this.actual_pin!=null){
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
              this.actual_pin=null;
              this.newPin=null;
              this.confirmNewPin=null;
              this.showPinConfig=false;
              let alert = this.alertCtrl.create({
              title: 'SUCCESS !',
          subTitle: 'The Pin was successfully edited ',
          buttons: ['OK']
          });
      alert.present();
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
  deletePin():void{
     let prompt = this.alertCtrl.create({
      title: 'Pin',
      message: "Enter your Actual Pin",
      inputs: [
        {
          type:'password',
          name: 'pin',
          placeholder: 'Actual pin'
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
            console.log('Saved clicked');
            if(data.pin===this.actual_pin){
              this.storage.ready().then(() => {
              this.storage.remove('pin');
              this.actual_pin=null;
              this.newPin=null;
              this.confirmNewPin=null;
              this.showPinConfig=false;
              });
            }else{
              let alert = this.alertCtrl.create({
              title: 'ERROR !',
              subTitle: 'The actual  Pin is incorrect. Try Again!',
              buttons: ['OK']
              });
            alert.present();
            }
          }
        }
      ]
    });
    prompt.present();
    /*        this.storage.ready().then(() => {
              this.storage.remove('pin');
              this.actual_pin=null;
              this.newPin=null;
              this.confirmNewPin=null;
              this.showPinConfig=false;
              console.log('remove Pin !!!!'+this.actual_pin);
            });*/
  }
  savePin():void{
    if(this.newPin===this.confirmNewPin){
      if(this.actual_pin==null || this.actual_pin==this.current_pin){
        this.storage.set('pin',this.newPin);
        this.actual_pin=this.newPin;
        this.showPinConfig=true;
        this.newPin=null;
        this.confirmNewPin=null;
        let alert = this.alertCtrl.create({
        title: 'SUCCESS !',
        subTitle: 'The Pin was successfully edited ',
        buttons: ['OK']
        });
      alert.present();
      console.log('done ',this.newPin);
      //this.navCtrl.setRoot(this.navCtrl.getActive().component);
      }else{
          let alert = this.alertCtrl.create({
        title: 'ERROR !',
        subTitle: 'The current pin is wrong. Try again!',
        buttons: ['OK']
      });
      alert.present();
      }
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