import { AuthService } from './../providers/auth-service';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {LoginPage} from '../pages/login/login';
import {MarketPage} from '../pages/market/market';
import {TradesPage} from '../pages/trades/trades';
import {DepositsPage} from '../pages/deposit/deposits';
import {SettingsPage} from '../pages/settings/settings';
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs'; 
import {CurrencyInfoPage} from '../pages/currencyInfo/currencyInfo';
import {PoloniexService} from './../providers/poloniexService';
import {FilterService} from './../providers/filterService';
import {HttpModule} from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { ChartModule } from 'angular2-highcharts';
//import * as highchart from 'highcharts';
import * as highstocks from 'highcharts/highstock';
@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    MarketPage,
    TradesPage,
    DepositsPage,
    SettingsPage,
    TabsPage,
    CurrencyInfoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot(),
    ChartModule.forRoot(highstocks)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    MarketPage,
    TradesPage,
    DepositsPage,
    SettingsPage,
    TabsPage,
    CurrencyInfoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    PoloniexService,
    FilterService
  ]
})
export class AppModule {}