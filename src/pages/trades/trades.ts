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
  currenciesTodisplay:Array<string>;
  searchTerm: string;
  depositsRand=["BAfrVYYJNCiD3L2fjR3rMy1hBsXRkE8FnG",];
  constructor(private nav: NavController, private app: App, private poloniexService: PoloniexService,public storage:Storage,public alertCtrl: AlertController, private filterService: FilterService) {
     
     
     this.isApiKey=true;
     this.apiKey=this.poloniexService.apiKey;
     this.secretKey=this.poloniexService.secretKey;

     
     if(this.apiKey==null || this.secretKey==null){
       this.isApiKey=false;
     }else{
       //this.LoadBalances();
     }
   
  }
  ngOnInit(): void {
    this.searchTerm="";
    this.LoadCurrencies();
    this.LoadBalances();
    //this.ShowMyTradeHistory();
  }
 

  ngOnDestroy() {

  }
  saveKeys(){
    this.storage.set('apiKey',this.apiKey);
    this.storage.set('secretKey',this.secretKey);
    console.log('done ',this.apiKey,' ',this.secretKey);
    this.isApiKey=true;
    this.LoadBalances();
  }
  doRefresh(refresher) {
    this.LoadBalances();
    refresher.complete();
    console.log(this.apiKey);
    console.log(this.secretKey);
  }
  /*
  LoadCurrencies() {
    console.log('LoadBalence111111111 called');
    console.log('key : '+this.poloniexService.apiKey);
    this.poloniexService.returnBalances(this.poloniexService.apiKey, this.poloniexService.secretKey).subscribe(data => {
      console.log('hahiya',data.result);
      if(typeof this.balance==="undefined"){
        this.currencies=[];
      }else{
        this.currencies=Object.keys(this.balance);
        this.LoadBalances();
      }
    });

}*/
  LoadBalances() {
    console.log('LoadBalence called');
    console.log('key : '+this.poloniexService.apiKey);
    this.poloniexService.returnBalances(this.poloniexService.apiKey, this.poloniexService.secretKey).subscribe(data => {
      this.balance = data.result;
    });

  }
  LoadCurrencies() {
    this.poloniexService.returnCurrencies().subscribe(data => {
      if (data.success) {
       this.currencies = Object.keys(data.result);
       this.currenciesTodisplay= Object.keys(data.result);
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
      this.currenciesTodisplay= this.filterService.filterCurrencies(this.currencies, this.searchTerm);
      this.LoadBalances();
  }

}
