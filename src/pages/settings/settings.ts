import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { PoloniexService } from '../../providers/poloniexService';
import { AlertController } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { SecurityPage } from '../security/security';
import { ContactUsPage } from '../contactUs/contactUs';


@Component({
  selector: 'page-contact',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  
  items = [
    'security',
    'about',
    'contact us'
  ];

  constructor(private nav: NavController){
        
    
    console.log('settings called');
  }

  
   itemSelected(item: string) {
    console.log("Selected Item", item);
    if(item=="about"){
      this.nav.push(AboutPage);
    }else if(item=="security"){
      this.nav.push(SecurityPage);
    }else if(item=="contact us"){
      this.nav.push(ContactUsPage);
    }

  }
}
