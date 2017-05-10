import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/Rx';
import { Storage } from '@ionic/storage';

@Injectable()
export class PoloniexService{
  private backEndUrl:string;
  public apiKey:string;
  public secretKey:string;
  constructor(private http:Http,private storage:Storage){
    console.log('service is ready...');
    this.grabKeys();
    this.backEndUrl = "http://192.241.247.142:3010"; // WebServer URL : 192.241.247.142
  }
  grabKeys(){
    this.storage.ready().then(() => {

       this.storage.get('apiKey').then((api) => {
         console.log('apikey : ', api);
         this.apiKey = api;
       })
       this.storage.get('secretKey').then((api) => {
         console.log('secret key : ', api);
         this.secretKey = api;
       })

     });
  }
  returnTicker(){
     return this.http.get(this.backEndUrl+"/ticker").map(res => res.json().result);
  }
  returnBalances(apiKey:string,secretKey:string){
    return this.http.get(this.backEndUrl+"/balances&"+apiKey+"&"+secretKey).map(res => res.json());
  }
  returnTradeHistory(currencyPair, start, end){
    return this.http.get(this.backEndUrl+'/tradehistory&'+currencyPair+'&'+start+'&'+end).map(res => res.json().result);
  }
  returnOrderBook(currencyPair,depth){
    return this.http.get(this.backEndUrl+'/orderbook&'+currencyPair+'&'+depth).map(res => res.json().result);
  }
  returnChartData(currencyPair,period,start,end){
    return this.http.get(this.backEndUrl+'/chartdata&'+currencyPair+'&'+period+'&'+start+'&'+end).map(res => res.json());
  }
  buy(apikey,secretKey,currencyPair,amount){
    return this.http.get(this.backEndUrl+'/buy&'+apikey+"&"+secretKey+"&"+currencyPair+"&"+amount).map(res => res.json());
  }
  sell(apikey,secretKey,currencyPair,amount){
    return this.http.get(this.backEndUrl+'/sell&'+apikey+"&"+secretKey+"&"+currencyPair+"&"+amount).map(res => res.json());
  }
  returnDepositAddresses(apiKey:string,secretKey:string){
    console.log('service',this.apiKey)
    return this.http.get(this.backEndUrl+"/depositaddresses&"+apiKey+"&"+secretKey).map(res => res.json());
  }
}
