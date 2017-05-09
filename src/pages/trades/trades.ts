
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, App } from 'ionic-angular'; //import App
import { PoloniexService } from '../../providers/poloniexService';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-trades',
  templateUrl: 'trades.html'
})
export class TradesPage implements OnInit, OnDestroy {
  apiKey:string;
  secretKey:string;
  coin: string;
  currencies: Array<string>;
  markets: Array<string>;
  balance:any;
  isApiKey:any;
  constructor(private nav: NavController, private app: App, private poloniexService: PoloniexService,public storage:Storage) {
     // Or to get a key/value pair
     this.storage.get('apiKey').then((val) => {
       this.apiKey=val;
     })
     this.storage.get('secretKey').then((val) => {
       this.secretKey=val;
       //test to be removed
       console.log('secrect key : ',val);
     })
     if(this.apiKey==null || this.secretKey==null){
       this.isApiKey=true;
     }
    this.coin = "BTC";
    this.markets = ['BTC_BBR', 'BTC_BCN', 'BTC_BELA', 'BTC_BITS', 'BTC_BLK', 'BTC_BTCD', 'BTC_BTM', 'BTC_BTS', 'BTC_BURST', 'BTC_C2', 'BTC_CLAM', 'BTC_CURE', 'BTC_DASH'];
    this.currencies = ['AMP', 'ARDR', 'BBR', 'BCN', 'BCY', 'BELA', 'BITS',
      'BLK', 'BTC', 'BTCD', 'BTM', 'BTS', 'BURST', 'C2', 'CLAM', 'CURE', 'DASH', 'DCR', 'DGB', 'DOGE',
      'DOGE', 'EMC2', 'ETC', 'ETH', 'EXP', 'FCT', 'FLDC', 'FLO', 'GAME', 'GNO', 'GNT',
      'GRC', 'HUC', 'HZ', 'IOC', 'LBC', 'LSK', 'LTC', 'MAID', 'MYR', 'NAUT', 'NAV', 'NEOS',
      'NMC', 'NOBL', 'NOTE', 'NSR', 'NXC', 'NXT', 'OMNI', 'PASC', 'PINK', 'POT', 'PPC', 'QBK',
      'QORA', 'QTL', 'RADS', 'RBY', 'REP', 'RIC', 'SBD', 'SC', 'SDC', 'SJCX', 'STEEM', 'STR', 'STRAT',
      'SYC', 'UNITY', 'VIA', 'VOX', 'VRC', 'VTC', 'XBC', 'XCP', 'XEM', 'XMG', 'XMR', 'XPM', 'XRP', 'XVC', 'ZEC'];
  }
  ngOnInit(): void {
    this.LoadBalances();
  }
  ngOnDestroy() {

  }
  saveKeys(){
    this.storage.set('apiKey',this.apiKey);
    this.storage.set('secretKey',this.secretKey);
    console.log('done ',this.apiKey,' ',this.secretKey);
    this.isApiKey=true;
  }
  doRefresh(refresher) {
    this.LoadBalances();
    refresher.complete();
    console.log(this.apiKey);
    console.log(this.secretKey);
  }
  LoadBalances() {
    console.log('LoadBalence called');
    //console.log('key : '+this.poloniexService.apiKey);
    this.poloniexService.returnBalances(this.poloniexService.apiKey, this.poloniexService.secretKey).subscribe(data => {
      //console.log(data);
      this.balance = data.result;


    });

  }
  deleteKeys():void{
    this.apiKey=null;
    this.secretKey=null;
    this.storage.set('apiKey',null);
    this.storage.set('secretKey',null);
    this.isApiKey=false;
  }

}
