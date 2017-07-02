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
    'Security',
    'About',
    'Contact us'
  ];

  constructor(private nav: NavController){
        
    
    console.log('settings called');
  }

  
   itemSelected(item: string) {
    console.log("Selected Item", item);
    if(item=="About"){
      this.nav.push(AboutPage);
    }else if(item=="Security"){
      this.nav.push(SecurityPage);
    }else if(item=="Contact us"){
      this.nav.push(ContactUsPage);
    }

  }
}
