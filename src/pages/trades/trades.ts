import { Component ,OnInit,OnDestroy} from '@angular/core';
import { NavController, App} from 'ionic-angular'; //import App
import { PoloniexService } from '../../providers/poloniexService';

@Component({
  selector: 'page-trades',
  templateUrl: 'trades.html'
})
export class TradesPage implements OnInit,OnDestroy {
  coin: string;
  currencies:Array<string>;
  markets:Array<string>;
  balance;
  constructor(private nav: NavController,private app:App,private poloniexService : PoloniexService) {
    this.coin="BTC";
    this.markets = ['BTC_BBR','BTC_BCN','BTC_BELA','BTC_BITS','BTC_BLK','BTC_BTCD','BTC_BTM','BTC_BTS','BTC_BURST','BTC_C2','BTC_CLAM','BTC_CURE','BTC_DASH'];
    this.currencies = ['AMP','ARDR','BBR','BCN','BCY','BELA','BITS',
                      'BLK','BTC','BTCD','BTM','BTS','BURST','C2','CLAM','CURE','DASH','DCR','DGB','DOGE',
                      'DOGE','EMC2','ETC','ETH','EXP','FCT','FLDC','FLO','GAME','GNO','GNT',
                      'GRC','HUC','HZ','IOC','LBC','LSK','LTC','MAID','MYR','NAUT','NAV','NEOS',
                      'NMC','NOBL','NOTE','NSR','NXC','NXT','OMNI','PASC','PINK','POT','PPC','QBK',
                      'QORA','QTL','RADS','RBY','REP','RIC','SBD','SC','SDC','SJCX','STEEM','STR','STRAT',
                      'SYC','UNITY','VIA','VOX','VRC','VTC','XBC','XCP','XEM','XMG','XMR','XPM','XRP','XVC','ZEC'];
  }
   ngOnInit(): void {
      this.LoadBalances();
  }
   ngOnDestroy(){
    
  }
  
    doRefresh(refresher) {
      this.LoadBalances();
      refresher.complete();
  }
    LoadBalances(){
       console.log('LoadBalence called');
       this.poloniexService.returnBalances().subscribe(data => {
        //console.log(data);
        this.balance=data;
       
      
      });
      
  }
  
}
