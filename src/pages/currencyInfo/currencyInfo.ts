import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { PoloniexService } from '../../providers/poloniexService';
@Component({
    selector: 'page-info',
    templateUrl: 'currencyInfo.html'
})
export class CurrencyInfoPage {
    private marketId: string;
    private currencyId: string;
    private pair: string;
    private tradeHistory: any;
    private askOptions: any;
    private bidOptions: any;
    private candlestickOptions: any;
    private bids;
    private asks;
    private chartData;
    private zoomId;
    private periodId;
    private buy_sell = <any>{};
    private buyAmount;
    private buyTotal;
    private sellAmount;
    private sellTotal;
    constructor(private navCtrl: NavController, private navParam: NavParams, private poloniexService: PoloniexService, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
        console.log('key : ' + this.poloniexService.apiKey);
        this.marketId = navParam.get("marketId");
        this.currencyId = navParam.get("currencyId");
        this.pair = this.marketId + '_' + this.currencyId;
        this.loadTradeHistory();
        this.loadOrderBook();
        this.zoomId = 21600; //6h
        this.periodId = 300; //5min
        this.loadChartData();
        this.buy_sell = {
            "ask": null,
            "bid": null,
            "buyBalance": null,
            "sellBalance": null
        };
        this.loadBuySellOptions();
    }
    loadBuySellOptions() {
        this.poloniexService.returnTicker().subscribe(data => {
            if (data) {
                this.buy_sell.ask = data[this.pair].lowestAsk;
                this.buy_sell.bid = data[this.pair].highestBid;
            }
        });
        this.poloniexService.returnBalances(this.poloniexService.apiKey, this.poloniexService.secretKey).subscribe(data => {
            //console.log(data);
            if (data.success) {
                this.buy_sell.buyBalance = data.result[this.marketId];
                this.buy_sell.sellBalance = data.result[this.currencyId];
            }
            //console.log(this.buy_sell);
        });
    }
    calculateBuy() {
        this.buyTotal = this.buy_sell.ask * this.buyAmount;
    }
    calculateSell() {
        this.sellTotal = this.buy_sell.bid * this.sellAmount;
    }
    submitBuy() {
        if (isNaN(this.buyAmount) || this.buyAmount <= 0) {
            let alert = this.alertCtrl.create({
                title: 'Buy Failed',
                subTitle: "Please provide a valid amount",
                buttons: ['OK']
            });
            alert.present(prompt);
        }
        else if (this.poloniexService.apiKey == null || this.poloniexService.secretKey == null) {
            let alert = this.alertCtrl.create({
                title: 'Buy Failed',
                subTitle: "No ApiKey found, please save yours in the settings section",
                buttons: ['OK']
            });
            alert.present(prompt);
        } else {
            let loading = this.loadingCtrl.create({
                spinner : 'dots',
                content: 'Please wait...'
            });

            loading.present();
            this.poloniexService.buy(this.poloniexService.apiKey, this.poloniexService.secretKey, this.pair, this.buyAmount).subscribe(data => {
                if (data.success) {
                    loading.dismiss();
                    let alert = this.alertCtrl.create({
                        title: 'Buy Succeded',
                        subTitle: "Operation is completed succefully",
                        buttons: ['OK']
                    });
                    alert.present(prompt);
                }
                else {
                    loading.dismiss();
                    let alert = this.alertCtrl.create({
                        title: 'Buy Failed',
                        subTitle: "Insufficient balance to make this operation",
                        buttons: ['OK']
                    });
                    alert.present(prompt);
                }
            });
        }

    }
    submitSell() {
        if (isNaN(this.sellAmount) || this.sellAmount <= 0) {
            let alert = this.alertCtrl.create({
                title: 'Sell Failed',
                subTitle: "Please provide a valid amount",
                buttons: ['OK']
            });
            alert.present(prompt);
        }
        else if (this.poloniexService.apiKey == null || this.poloniexService.secretKey == null) {
            let alert = this.alertCtrl.create({
                title: 'Sell Failed',
                subTitle: "No ApiKey found, please save yours in the trades section",
                buttons: ['OK']
            });
            alert.present(prompt);
        } else {
            let loading = this.loadingCtrl.create({
                spinner : 'dots',
                content: 'Please wait...'
            });

            loading.present();
            this.poloniexService.sell(this.poloniexService.apiKey, this.poloniexService.secretKey, this.pair, this.sellAmount).subscribe(data => {
                if (data.success) {
                    loading.dismiss();
                    let alert = this.alertCtrl.create({
                        title: 'Sell Succeded',
                        subTitle: "Operation is completed succefully",
                        buttons: ['OK']
                    });
                    alert.present(prompt);
                }
                else {
                    loading.dismiss();
                    let alert = this.alertCtrl.create({
                        title: 'Sell Failed',
                        subTitle: "Insufficient balance to make this operation",
                        buttons: ['OK']
                    });
                    alert.present(prompt);
                }
            });
        }

    }
    
    loadChartData() {
        let now = Math.round(new Date().getTime() / 1000);
        let before = now - Number(this.zoomId);
        this.poloniexService.returnChartData(this.pair, Number(this.periodId), before, now).subscribe(res => {
            if (res.success) {
                let data = res.result;
                this.chartData = [];
                for (let i = 0; i < data.length; i++) {
                    this.chartData[i] = [parseInt(data[i].date), parseFloat(data[i].open),
                    parseFloat(data[i].high), parseFloat(data[i].low), parseFloat(data[i].close)];
                }
                this.candlestickOptions = {
                    chart: {
                        zoomType: 'xy',
                        width: window.innerWidth - 60
                    },
                    title: {
                        text: this.navParam.get("currencyId") + ' STOCK PRICE'
                    },
                    plotOptions: {
                        candlestick: {
                            color: 'red',
                            upColor: 'green'
                        }
                    },
                    legend: {
                        enabled: false
                    },

                    series: [{
                        name: this.pair,
                        type: 'candlestick',
                        data: this.chartData,
                        tooltip: {
                            valueDecimals: 2
                        }
                    }],
                    yAxis: {
                        title: {
                            text: ''
                        }
                    },
                    credits: {
                        enabled: false
                    }
                };

            }
        });
    }
    loadOrderBook() {
        let depth = 5;
        this.poloniexService.returnOrderBook(this.pair, depth).subscribe(data => {
            if (data) {
                this.asks = new Array(depth);
                this.bids = new Array(depth);
                for (let i = 0; i < depth; i++) {
                    this.asks[i] = [Number(data.asks[i][0]), data.asks[i][1]];
                    this.bids[i] = [Number(data.bids[i][0]), data.bids[i][1]];
                }
                //console.log('asks : ' + this.asks);
                //console.log('bids : ' + this.bids);
                this.askOptions = {
                    chart: {
                        type: 'area',
                        width: window.innerWidth - 60,
                        zoomType: 'xy'
                    },
                    title: {
                        text: 'Market Depth - Asks'
                    },
                    yAxis: {
                        title: {
                            text: ''
                        }
                    },
                    series: [{
                        name: 'Asks',
                        data: this.asks,
                        color: '#a42015'
                    }],
                    credits: {
                        enabled: false
                    }
                };
                this.bidOptions = {
                    chart: {
                        type: 'area',
                        width: window.innerWidth - 60,
                        zoomType: 'xy'
                    },
                    title: {
                        text: 'Market Depth - Bids'
                    },
                    yAxis: {
                        title: {
                            text: ''
                        }
                    },
                    series: [{
                        name: 'Bids',
                        data: this.bids,
                        color: '#339349'
                    }],
                    credits: {
                        enabled: false
                    }
                };
            }
        });
        //console.log('asks : ' + this.asks);
    }
    loadTradeHistory() {
        let now = Math.round(new Date().getTime() / 1000);
        let before = now - 600; //5min
        this.poloniexService.returnTradeHistory(this.pair, before, now).subscribe(data => {
            let help: Array<{}> = new Array<{}>();
            if (data) {
                let max = data.length > 20 ? 20 : data.length; //just last 20 orders
                for (var index = 0; index < max; index++) {
                    help.push(data[index]);
                }
                this.tradeHistory = help;
            } else {
                this.tradeHistory = data;
            }
        });
    }
    doRefresh(refresher) {
        console.log('refresh');
        this.loadTradeHistory();
        this.loadOrderBook();
        this.loadChartData();
        this.loadBuySellOptions();
        refresher.complete();
    }
}
