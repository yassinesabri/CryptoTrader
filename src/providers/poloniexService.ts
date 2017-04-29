import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Obervable';
import 'rxjs/Rx';

@Injectable()
export class PoloniexService{
  apiKey:string;
  secretKey:string;
  Url:string;
  backEndUrl:string;
  poloniex;
  constructor(private http:Http){
    console.log('service is ready...');
    this.Url='https://poloniex.com/public?command=';
    this.apiKey = 'FEP2GU36-66H13OOV-3BNN10D1-SPVHZ755';
    this.secretKey = "f2577bcbe5e3570010bacaa8eb1d486dc7a1faf3418ed6db6678902ed3491368301298d3fdff7d86998e4cc96ccfaa289321044a02f463da0661d415f411cfe8";
    this.backEndUrl = "http://localhost:3010"; //WebServer URL : 192.241.247.142

  }
  returnTicker(){
    //return this.http.get(this.Url+'returnTicker').map(res => res.json());
    return this.http.get(this.backEndUrl+"/ticker").map(res => res.json().result);
  }
  returnBalances(){
    return this.http.get(this.backEndUrl+"/balances").map(res => res.json().result);
  }
}
