import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, App } from 'ionic-angular'; //import App
import { PoloniexService } from '../../providers/poloniexService';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { DepositsPage } from '../deposit/deposits';
import { FilterService } from '../../providers/filterService';


@Component({
  selector: 'page-trades',
  templateUrl: 'trades.html'
})
export class TradesPage implements OnInit, OnDestroy {
  apiKey:string;
  secretKey:string;
  coin: string;
  currencies: Array<string>;
  balance:any;
  isApiKey:boolean;
  action:any;
  deposit:Array<string>;
  end:number;
  start:number;
  searchTerm:string;
  depositsRand=["BAfrVYYJNCiD3L2fjR3rMy1hBsXRkE8FnG",];
  constructor(private nav: NavController, private app: App, private poloniexService: PoloniexService,public storage:Storage,public alertCtrl: AlertController, private filterService: FilterService) {
     // Or to get a key/value pair
     //console.log("!!!!!!!!!!!!!!!!!!!!"+this.start+"        "+ Math.round(new Date().getTime() / 1000));
     this.searchTerm="";
     this.isApiKey=true;
     this.apiKey=this.poloniexService.apiKey;
     this.secretKey=this.poloniexService.secretKey;
     /*this.storage.get('apiKey').then((val) => {
       this.apiKey=val;
     })
     this.storage.get('secretKey').then((val) => {
       this.secretKey=val;
       //test to be removed
       console.log('secrect key : ',val);
     })*/
     if(this.apiKey==null || this.secretKey==null){
       this.isApiKey=false;
     }
   // this.currencies = ['AMP', 'ARDR', 'BBR', 'BCN', 'BCY', 'BELA', 'BITS',
     // 'BLK', 'BTC', 'BTCD', 'BTM', 'BTS', 'BURST', 'C2', 'CLAM', 'CURE', 'DASH', 'DCR', 'DGB', 'DOGE',
 //     'DOGE', 'EMC2', 'ETC', 'ETH', 'EXP', 'FCT', 'FLDC', 'FLO', 'GAME', 'GNO', 'GNT',
   //   'GRC', 'HUC', 'HZ', 'IOC', 'LBC', 'LSK', 'LTC', 'MAID', 'MYR', 'NAUT', 'NAV', 'NEOS',
     // 'NMC', 'NOBL', 'NOTE', 'NSR', 'NXC', 'NXT', 'OMNI', 'PASC', 'PINK', 'POT', 'PPC', 'QBK',
    //  'QORA', 'QTL', 'RADS', 'RBY', 'REP', 'RIC', 'SBD', 'SC', 'SDC', 'SJCX', 'STEEM', 'STR', 'STRAT',
      //'SYC', 'UNITY', 'VIA', 'VOX', 'VRC', 'VTC', 'XBC', 'XCP', 'XEM', 'XMG', 'XMR', 'XPM', 'XRP', 'XVC', 'ZEC'];
  }
  ngOnInit(): void {
    //this.LoadCurrencies();
   // this.depositAdress();
    this.LoadBalances();
    //this.ShowMyTradeHistory();
  }
  returnRandom():void{
   // return Math.random() * (max - min) + min;
  }
  depositAdress():void{
   // console.log("deposit adresse called !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    this.poloniexService.returnDepositAddresses(this.poloniexService.apiKey, this.poloniexService.secretKey).subscribe(data => {
           
           //this.poloniexService.generateNewAddress(this.poloniexService.apiKey, this.poloniexService.secretKey, this.currencyId).subscribe(data => {
                
                this.deposit=data.result;
                
               // this.currencies=Object.keys(this.deposit);
                console.log("!!!!!!!!!!!!!!!!!!h"+this.deposit);
                //this.address=this.deposit['response'];
                
            });
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
   // this.depositAdress();
    this.LoadBalances();
    refresher.complete();
    console.log(this.apiKey);
    console.log(this.secretKey);
  }
  LoadBalances() {
    console.log('LoadBalence called');
    console.log('key : '+this.poloniexService.apiKey);
    this.poloniexService.returnBalances(this.poloniexService.apiKey, this.poloniexService.secretKey).subscribe(data => {
      this.balance = data.result;
      console.log('hahiya',data.result);
      if(typeof this.balance==="undefined"){
        this.currencies=[];
      }else{
        this.currencies=Object.keys(this.balance);
      }
    });

  }
  LoadCurrencies() {
    this.poloniexService.returnCurrencies().subscribe(data => {
      if (data.success) {
       this.currencies = Object.keys(data.result);
      }
    });
  }
  deleteKeys():void{
    this.apiKey=null;
    this.secretKey=null;
    this.storage.set('apiKey',null);
    this.storage.set('secretKey',null);
    this.isApiKey=!this.isApiKey;
  }
  showDeposit(currencyId:string,coinBalannce:any):void{
    this.nav.push(DepositsPage,{
      "currencyId" : currencyId,
      "balance": coinBalannce
    });
  }
  /*
  ShowMyTradeHistory(){
    this.end =Math.round(new Date().getTime() / 1000);
    this.start=this.end - 600;
    this.poloniexService.returnMyTradeHistory(this.poloniexService.apiKey, this.poloniexService.secretKey, "BTC_BCN",this.start, this.end).subscribe(data => {
                console.log('THE HISTORY',data);
  });*/
  setFilteredItems():void{
      this.currencies= this.filterService.filterCurrencies(this.currencies, this.searchTerm);
      this.LoadBalances();
  }

}
