import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, App , AlertController, LoadingController} from 'ionic-angular'; //import App
import { PoloniexService } from '../../providers/poloniexService';
import { NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'page-deposit',
    templateUrl: 'deposits.html'
})
export class DepositsPage implements OnInit,OnDestroy {
    status:string;
    coin:number;
    amount:number;
    start:number;
    end:number;
    address:string;
    action: string;
    showDep: boolean;
    showWith: boolean;
    deposit: any;
    withdrawAddress: string;
    withdrawAmount: number;
    currencyId:string;
    depositHistory:any;
    withdrawHistory:any;
    depositWithdraw:any;
    balanceId:any;
    addressW:string;
    constructor(private navParams: NavParams, public poloniexService: PoloniexService,public storage:Storage, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
        this.currencyId = navParams.get("currencyId");
        this.balanceId = navParams.get("balance");
        this.address = navParams.get("depositAddress");
    }
    changeAction(): void {
        if (this.action == 'Deposit') {
            this.showDep = true;
            this.showWith = false;
            console.log('deposit called');
            //console.log('key : '+this.poloniexService.apiKey);
            
            
        }
        else if (this.action == 'withdraw') {
            this.showDep = false;
            this.showWith = true;
        }
        console.log(this.action);
    }
    loadHistory():void{
         this.end = Math.round(new Date().getTime() / 1000);
         this.start=1000;
        this.poloniexService.returnDepositsWithdrawals(this.poloniexService.apiKey, this.poloniexService.secretKey, this.start,this.end).subscribe(data => {
                
                this.depositWithdraw=data.result;
                this.depositHistory=this.depositWithdraw["deposits"];
               // console.log('the withdraws and deposits',this.depositHistory);
                //console.log('the withdraws and deposits',this.depositHistory.currency);
                //console.log('the withdraws and deposits',this.depositHistory["currency"]);
                
                this.withdrawHistory=this.depositWithdraw["withdrawals"];
            });

    }
    ngOnInit(): void {
        this.loadHistory();
    }
    ngOnDestroy(): void {}
    withdraw():void{
        
        if (isNaN(this.withdrawAmount) || this.withdrawAmount <= 0) {
            let alert = this.alertCtrl.create({
                title: 'Withdraw Failed',
                subTitle: "Please provide a valid amount",
                buttons: ['OK']
            });
            alert.present(prompt);
        }
        else if (this.withdrawAddress == null || this.withdrawAddress.length <= 3) {
            let alert = this.alertCtrl.create({
                title: 'Withdraw Failed',
                subTitle: "Please provide a valid Address",
                buttons: ['OK']
            });
            alert.present(prompt);
        } else {
            let loading = this.loadingCtrl.create({
                spinner : 'dots',
                content: 'Please wait...'
            });

            loading.present();
            this.poloniexService.withdraw(this.poloniexService.apiKey, this.poloniexService.secretKey, this.currencyId,this.amount,this.addressW).subscribe(data => {
                console.log('THE HISTORY',data);
                if (data.success) {
                    loading.dismiss();
                    let alert = this.alertCtrl.create({
                        title: 'Withdraw Succeded',
                        subTitle: "Operation is completed succefully",
                        buttons: ['OK']
                    });
                    alert.present(prompt);
                }
                else {
                    loading.dismiss();
                    let alert = this.alertCtrl.create({
                        title: 'Withdraw Failed',
                        subTitle: "Insufficient balance to make this operation",
                        buttons: ['OK']
                    });
                    alert.present(prompt);
                }
            });
        }
    }
}
