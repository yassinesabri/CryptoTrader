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


  username = '';
  email = '';
  markets : Array<String>;
  currencies : Array<String>;
  ticker : any;
  balances : any;
  market_interval_id;
  //Inject App to get the rootNav from it and not from the NavController
  constructor(private nav: NavController, private auth: AuthService,private app:App,private poloniexService : PoloniexService) {
    let info = this.auth.getUserInfo();
    this.username = info['name'];
    this.email = info['email'];
    this.markets = ['BTC_BBR','BTC_BCN','BTC_BELA','BTC_BITS','BTC_BLK','BTC_BTCD','BTC_BTM','BTC_BTS','BTC_BURST','BTC_C2','BTC_CLAM','BTC_CURE','BTC_DASH'];
    this.currencies = ['1CR','ABY','BCN','BTC','FLDC','GRC','QORA','SDC','TOR','XAP','X13','XLB'];
  }
  ngOnInit(): void {
      //console.log('onInit');
      this.LoadMarket();
      this.market_interval_id = setInterval(() => {
         this.LoadMarket(); 
         }, 2000);
  }
  ngOnDestroy(){
    if (this.market_interval_id) {
    clearInterval(this.market_interval_id);
    }
  }
  LoadMarket(){
        console.log('LoadMarket called');
       this.poloniexService.returnTicker().subscribe(data => {
        console.log(data);
        this.ticker = data;
      });
  }
  doRefresh(refresher) {
      this.poloniexService.returnTicker().subscribe(data => {
        //console.log(data);
        this.ticker = data;
      });
      this.poloniexService.returnBalances().subscribe(data => {
        //console.log(data);
        this.balances = data;
      });
      refresher.complete();
  }
  public logout() {
    this.auth.logout().subscribe(succ => {
      this.app.getRootNav().setRoot(LoginPage)
    });
  }
}
