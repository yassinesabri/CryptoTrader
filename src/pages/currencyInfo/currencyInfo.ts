import { Component } from '@angular/core';
import { NavController ,NavParams} from 'ionic-angular';
import { PoloniexService } from '../../providers/poloniexService';
@Component({
  selector: 'page-info',
  templateUrl: 'currencyInfo.html'
})
export class CurrencyInfoPage {
    private marketId:string;
    private currencyId:string;
    private pair:string;
    private tradeHistory:any;
    constructor(private navCtrl:NavController,private navParam : NavParams,private poloniexService : PoloniexService){
        this.marketId = navParam.get("marketId");
        this.currencyId = navParam.get("currencyId");
        this.pair = this.marketId+'_'+this.currencyId;
        this.loadTradeHistory();
    }
    loadTradeHistory(){
        let now = Math.round(new Date().getTime()/1000);
        let before = now - 300; //5min
        this.poloniexService.returnTradeHistory(this.pair,before,now).subscribe(data =>{
            this.tradeHistory = data;
        });
    }
    doRefresh(refresher) {
      console.log('refresh');
      this.loadTradeHistory();
      refresher.complete();
    }
}
