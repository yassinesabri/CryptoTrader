import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class PoloniexService{
  private backEndUrl:string;
  constructor(private http:Http){
    //console.log('service is ready...');
    this.backEndUrl = "http://localhost:3010"; //WebServer URL : 192.241.247.142
  }
  returnTicker(){
     return this.http.get(this.backEndUrl+"/ticker").map(res => res.json().result);
  }
  returnBalances(){
    return this.http.get(this.backEndUrl+"/balances").map(res => res.json().result);
  }
  returnTradeHistory(currencyPair, start, end){
    return this.http.get(this.backEndUrl+'/tradehistory&'+currencyPair+'&'+start+'&'+end).map(res => res.json().result);
  }
  returnOrderBook(currencyPair,depth){
    return this.http.get(this.backEndUrl+'/orderbook&'+currencyPair+'&'+depth).map(res => res.json().result);
  }
}
