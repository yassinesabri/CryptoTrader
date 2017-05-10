import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, App } from 'ionic-angular'; //import App
import { PoloniexService } from '../../providers/poloniexService';
import { NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'page-deposit',
    templateUrl: 'deposits.html'
})
export class DepositsPage {
    action: string;
    showDep: boolean;
    showWith: boolean;
    deposit: any;
    coin: string;
    withdrawAddress: string;
    withdrawAmount: string;
    constructor(private navParams: NavParams, public poloniexService: PoloniexService) {
        this.coin = "BTC";
    }
    changeAction(): void {
        if (this.action == 'Deposit') {
            this.showDep = true;
            this.showWith = false;
            console.log('deposit called');
            //console.log('key : '+this.poloniexService.apiKey);
            this.poloniexService.returnDepositAddresses(this.poloniexService.apiKey, this.poloniexService.secretKey).subscribe(data => {
                //console.log(data);
                this.deposit = data.result;
                console.log('hoooooooo', this.deposit);
            });
        }
        else if (this.action == 'withdraw') {
            this.showDep = false;
            this.showWith = true;
        }
        console.log(this.action);
    }
}
