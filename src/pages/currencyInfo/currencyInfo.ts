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
        let before = now - 600; //5min
        this.poloniexService.returnTradeHistory(this.pair,before,now).subscribe(data =>{
            let help :Array<{}> =  new Array<{}>();
            let max = data.length > 20 ? 20 : data.length; //just last 20 orders
            for (var index = 0; index < max; index++) {
                help.push(data[index]);
            }
            this.tradeHistory = help;
        });
    }
    doRefresh(refresher) {
      console.log('refresh');
      this.loadTradeHistory();
      refresher.complete();
    }
}
