import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { PoloniexService } from '../../providers/poloniexService';

@Component({
  selector: 'page-contact',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  constructor(private storage:Storage,private poloniexService: PoloniexService){
    console.log('settings called');
    storage.ready().then(() => {
       // set a key/value
       storage.set('apiKey', 'FEP2GU36-66H13OOV-3BNN10D1-SPVHZ755');
       storage.set('secretKey', 'f2577bcbe5e3570010bacaa8eb1d486dc7a1faf3418ed6db6678902ed3491368301298d3fdff7d86998e4cc96ccfaa289321044a02f463da0661d415f411cfe8');
     });
     this.poloniexService.grabKeys();
  }
}
