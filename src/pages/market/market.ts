import { Component, OnInit } from '@angular/core';
import { NavController, App } from 'ionic-angular'; //import App
import { AuthService } from '../../providers/auth-service';
import { PoloniexService } from '../../providers/poloniexService';
import { CurrencyInfoPage } from '../currencyInfo/currencyInfo';
import { FilterService } from '../../providers/filterService';

@Component({
  selector: 'page-home',
  templateUrl: 'market.html'
})
export class MarketPage implements OnInit {

  currencies: Array<String>;
  ticker: any;
  market_interval_id;
  market_id: string;
  searchTerm: string;
  currenciesToDisplay: Array<String>;
  //Inject App to get the rootNav from it and not from the NavController
  constructor(private nav: NavController, private auth: AuthService, private app: App, private poloniexService: PoloniexService, private filterService: FilterService) {
    this.market_id = 'BTC';
    this.searchTerm = "";
    /**
     * this.currencies = ['AMP','ARDR','BBR','BCN','BCY','BELA','BITS',
                      'BLK','BTC','BTCD','BTM','BTS','C2','CLAM','CURE','DASH','DCR','DGB','DOGE',
                      'EMC2','ETC','ETH','EXP','FCT','FLDC','FLO','GAME','GNO','GNT',
                       'GRC','HUC','HZ','IOC','LBC','LSK','LTC','MAID','MYR','NAUT','NAV','NEOS',
                      'NMC','NOBL','NOTE','NSR','NXC','NXT','OMNI','PASC','PINK','POT','PPC','QBK',
                      'QORA','QTL','RADS','RBY','REP','RIC','SBD','SC','SDC','SJCX','STR',
                      'SYC','UNITY','VIA','VOX','VRC','VTC','XBC','XCP','XEM','XMG','XMR','XPM','XRP','XVC','ZEC'];
     */
  }
  ngOnInit(): void {
    this.LoadCurrencies();
    this.LoadMarket();
    /*this.market_interval_id = setInterval(() => {
       this.LoadMarket(); 
       }, 2000);*/
  }
  LoadCurrencies() {
    this.poloniexService.returnCurrencies().subscribe(data => {
      if (data.success) {
        this.currencies = Object.keys(data.result);
        this.currenciesToDisplay = Object.keys(data.result);
      }
    });
  }
  LoadMarket() {
    this.ticker = null;
    console.log('LoadMarket called !');
    if (this.currencies) {
      this.poloniexService.returnTicker().subscribe(data => {
        //console.log(data);
        if (data) {
          //this.currencies = Object.keys(data);
          for (let i = 0; i < this.currenciesToDisplay.length; i++) {
            if (data[this.market_id + '_' + this.currenciesToDisplay[i]]) {
              let volume = parseFloat(data[this.market_id + '_' + this.currenciesToDisplay[i]].baseVolume).toFixed(3);
              let percentage = parseFloat(data[this.market_id + '_' + this.currenciesToDisplay[i]].percentChange).toFixed(3);
              data[this.market_id + '_' + this.currenciesToDisplay[i]].baseVolume = volume;
              data[this.market_id + '_' + this.currenciesToDisplay[i]].percentChange = '+'+percentage;
              if(parseFloat(percentage) > 0){
                data[this.market_id + '_' + this.currenciesToDisplay[i]].color = "positive";
              }
              else{
                data[this.market_id + '_' + this.currenciesToDisplay[i]].color = "negative";
              }
            }
          }
        }
        //console.log(data);
        this.ticker = data;
      });
    }
  }
  doRefresh(refresher) {
    this.LoadMarket();
    refresher.complete();
  }

  showCurrencyInfo(marketId: string, currencyId: string) {
    //console.log(marketId+'_'+currecyId);
    this.nav.push(CurrencyInfoPage, {
      "marketId": marketId,
      "currencyId": currencyId
    });
  }
  setFilteredItems() {
    this.currenciesToDisplay = this.filterService.filterCurrencies(this.currencies, this.searchTerm);
    this.LoadMarket();
    //console.log(this.currenciesToDisplay);
  }
}
