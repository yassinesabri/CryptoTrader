import { AuthService } from './../providers/auth-service';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {LoginPage} from '../pages/login/login';
import {MarketPage} from '../pages/market/market';
import {TradesPage} from '../pages/trades/trades';
import {SettingsPage} from '../pages/settings/settings';
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs'; 
import {CurrencyInfoPage} from '../pages/currencyinfo/currencyinfo';
import {PoloniexService} from './../providers/poloniexService';
import {HttpModule} from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { ChartModule } from 'angular2-highcharts';
import * as highcharts from 'Highcharts';
@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    MarketPage,
    TradesPage,
    SettingsPage,
    TabsPage,
    CurrencyInfoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot(),
    ChartModule.forRoot(highcharts)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    MarketPage,
    TradesPage,
    SettingsPage,
    TabsPage,
    CurrencyInfoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    PoloniexService
  ]
})
export class AppModule {}