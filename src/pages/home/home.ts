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

  markets : Array<String>;
  currencies : Array<String>;
  ticker : any;
  balances : any;
  market_interval_id;
  market_id : string;
  //Inject App to get the rootNav from it and not from the NavController
  constructor(private nav: NavController, private auth: AuthService,private app:App,private poloniexService : PoloniexService) {
    this.markets = ['BTC_BBR','BTC_BCN','BTC_BELA','BTC_BITS','BTC_BLK','BTC_BTCD','BTC_BTM','BTC_BTS','BTC_BURST','BTC_C2','BTC_CLAM','BTC_CURE','BTC_DASH'];
    this.currencies = ['AMP','ARDR','BBR','BCN','BCY','BELA','BITS',
                      'BLK','BTC','BTCD','BTM','BTS','BURST','C2','CLAM','CURE','DASH','DCR','DGB','DOGE',
                      'DOGE','EMC2','ETC','ETH','EXP','FCT','FLDC','FLO','GAME','GNO','GNT',
                      'GRC','HUC','HZ','IOC','LBC','LSK','LTC','MAID','MYR','NAUT','NAV','NEOS',
                      'NMC','NOBL','NOTE','NSR','NXC','NXT','OMNI','PASC','PINK','POT','PPC','QBK',
                      'QORA','QTL','RADS','RBY','REP','RIC','SBD','SC','SDC','SJCX','STEEM','STR','STRAT',
                      'SYC','UNITY','VIA','VOX','VRC','VTC','XBC','XCP','XEM','XMG','XMR','XPM','XRP','XVC','ZEC'];
    this.market_id = 'BTC';
  }
  ngOnInit(): void {
      this.LoadMarket();
      /*this.market_interval_id = setInterval(() => {
         this.LoadMarket(); 
         }, 2000);*/
  }
  ngOnDestroy(){
    if (this.market_interval_id) {
      clearInterval(this.market_interval_id);
    }
  }
  LoadMarket(){
       console.log('LoadMarket called');
       this.poloniexService.returnTicker().subscribe(data => {
        //console.log(data);
        this.ticker = data;
      });
      if(this.ticker){
        for(let i=0;i<this.currencies.length;i++){
          if(this.ticker[this.market_id+'_'+this.currencies[i]]){
              let volume = parseFloat(this.ticker[this.market_id+'_'+this.currencies[i]].baseVolume).toFixed(3);
              let percentage = parseFloat(this.ticker[this.market_id+'_'+this.currencies[i]].percentChange).toFixed(2);
              this.ticker[this.market_id+'_'+this.currencies[i]].baseVolume = volume;
              this.ticker[this.market_id+'_'+this.currencies[i]].percentChange = percentage;
          } 
        }
      }
      
  }
  doRefresh(refresher) {
      this.LoadMarket();
      refresher.complete();
  }
  public logout() {
    this.auth.logout().subscribe(succ => {
      this.app.getRootNav().setRoot(LoginPage)
    });
  }
  changeMarket(){
    this.LoadMarket();
  }
}
