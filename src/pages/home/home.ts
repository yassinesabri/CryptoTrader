import { Component ,OnInit,OnDestroy} from '@angular/core';
import { NavController, App} from 'ionic-angular'; //import App
import { AuthService } from '../../providers/auth-service';
import { PoloniexService } from '../../providers/poloniexService';
import {LoginPage} from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit,OnDestroy {

  currencies : Array<String>;
  ticker : any;
  market_interval_id;
  market_id : string;
  //Inject App to get the rootNav from it and not from the NavController
  constructor(private nav: NavController, private auth: AuthService,private app:App,private poloniexService : PoloniexService) {
    this.currencies = ['AMP','ARDR','BBR','BCN','BCY','BELA','BITS',
                      'BLK','BTC','BTCD','BTM','BTS','C2','CLAM','CURE','DASH','DCR','DGB','DOGE',
                      'DOGE','EMC2','ETC','ETH','EXP','FCT','FLDC','FLO','GAME','GNO','GNT',
                      'GRC','HUC','HZ','IOC','LBC','LSK','LTC','MAID','MYR','NAUT','NAV','NEOS',
                      'NMC','NOBL','NOTE','NSR','NXC','NXT','OMNI','PASC','PINK','POT','PPC','QBK',
                      'QORA','QTL','RADS','RBY','REP','RIC','SBD','SC','SDC','SJCX','STR',
                      'SYC','UNITY','VIA','VOX','VRC','VTC','XBC','XCP','XEM','XMG','XMR','XPM','XRP','XVC','ZEC'];
    this.market_id = 'BTC';
  }
  ngOnInit(): void {
      this.LoadMarket();
      /*this.market_interval_id = setInterval(() => {
         this.LoadMarket(); 
         }, 2000);*/
  }
  ionViewDidEnter(){

  }
  ionViewWillLeave(){

  }
  ngOnDestroy(){
    if(this.market_interval_id) {
      clearInterval(this.market_interval_id);
    }
  }
  LoadMarket(){
       this.ticker = null;
       console.log('LoadMarket called');
       this.poloniexService.returnTicker().subscribe(data => {
        console.log(data);
        if(data){
            for(let i=0;i<this.currencies.length;i++){
              if(data[this.market_id+'_'+this.currencies[i]]){
                  let volume = parseFloat(data[this.market_id+'_'+this.currencies[i]].baseVolume).toFixed(3);
                  let percentage = parseFloat(data[this.market_id+'_'+this.currencies[i]].percentChange).toFixed(3);
                  data[this.market_id+'_'+this.currencies[i]].baseVolume = volume;
                  data[this.market_id+'_'+this.currencies[i]].percentChange = percentage;
              } 
            }
         } 
        this.ticker = data;
      });  
  }
  doRefresh(refresher) {
      this.LoadMarket();
      refresher.complete();
  }
  changeMarket(){
    this.LoadMarket();
  }
  public logout() {
    this.auth.logout().subscribe(succ => {
      this.app.getRootNav().setRoot(LoginPage)
    });
  }
}
