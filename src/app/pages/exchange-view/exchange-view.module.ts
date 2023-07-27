import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExchangeViewPageRoutingModule } from './exchange-view-routing.module';

import { ExchangeViewPage } from './exchange-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExchangeViewPageRoutingModule
  ],
  declarations: [ExchangeViewPage]
})
export class ExchangeViewPageModule {}
