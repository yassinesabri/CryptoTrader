import { Component } from '@angular/core';

import { TradesPage } from '../trades/trades';
import { SettingsPage } from '../settings/settings';
import { MarketPage } from '../market/market';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = MarketPage;
  tab2Root = TradesPage;
  tab3Root = SettingsPage;

  constructor() {

  }
}
