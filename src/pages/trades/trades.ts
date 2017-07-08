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
  apiKey: string;
  secretKey: string;
  coin: string;
  currencies: Array<string>;
  balance: any;
  isApiKey: boolean;
  action: any;
  deposit: Array<string>;
  end: number;
  start: number;
  currenciesTodisplay: Array<string>;
  searchTerm: string;
  Myhistory: Array<string>;
  constructor(private nav: NavController, private app: App, private poloniexService: PoloniexService, public storage: Storage, public alertCtrl: AlertController, private filterService: FilterService) {


    this.isApiKey = true;
    this.apiKey = this.poloniexService.apiKey;
    this.secretKey = this.poloniexService.secretKey;


    if (this.apiKey == null || this.secretKey == null) {
      this.isApiKey = false;
    }
  }


  ngOnInit(): void {
    this.searchTerm = "";
    this.LoadCurrencies();
    this.LoadBalances();
    this.ShowMyTradeHistory();
  }


  ngOnDestroy() {

  }

  saveKeys() {
    if (this.apiKey.length > 8 && this.secretKey.length > 8) {

      this.storage.set('apiKey', this.apiKey);
      this.storage.set('secretKey', this.secretKey);
      console.log('done !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1 ', this.apiKey, ' ', this.secretKey);
      this.isApiKey = true;
      this.LoadBalances();
    } else {
      let alert = this.alertCtrl.create({
        title: 'ERROR !',
        subTitle: "Please provide a valid API Key and a secret Key ",
        buttons: ['OK']
      });
      alert.present(prompt);
    }
  }
  doRefresh(refresher) {
    this.LoadBalances();
    this.ShowMyTradeHistory();
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
    if (this.isApiKey) {
      console.log('LoadBalence called');
      console.log('key de balance!!!!!!!!!!!!!!!!!!!!! : ' + this.apiKey+"<<<< "+this.secretKey);
      this.poloniexService.returnBalances(this.apiKey, this.secretKey).subscribe(data => {
        console.log('key de balance!!!!!!!!!!!!!!!!!!!!! : ' + this.apiKey+"<<<< "+this.secretKey);
        this.balance = data.result;
        console.log('done successfully balance !!!!!!!!!!!!!!!!!!!!! : ' + this.balance);

      });
    }
  }
  LoadCurrencies() {
    if (this.isApiKey) {
      this.poloniexService.returnCurrencies().subscribe(data => {
        if (data.success) {
          this.currencies = Object.keys(data.result);
          this.currenciesTodisplay = Object.keys(data.result);
        }
      });
    }
  }
  deleteKeys(): void {
    this.apiKey = null;
    this.secretKey = null;
    this.storage.set('apiKey', null);
    this.storage.set('secretKey', null);
    this.isApiKey = !this.isApiKey;
  }
  showDeposit(currencyId: string, coinBalannce: any): void {
    this.nav.push(DepositsPage, {
      "currencyId": currencyId,
      "balance": coinBalannce
    });
  }


  setFilteredItems(): void {
    this.currenciesTodisplay = this.filterService.filterCurrencies(this.currencies, this.searchTerm);
    this.LoadBalances();
  }
    ShowMyTradeHistory() {
    if (this.isApiKey) {
      this.end = Math.round(new Date().getTime() / 1000);
      this.start = this.end - 600;
      this.poloniexService.returnMyTradeHistory(this.apiKey, this.secretKey, "BTC_BCN", this.start, this.end).subscribe(data => {
        this.Myhistory = data.result;
        console.log(data.result + " keysssssssssss");
      });
    }
  }

}
