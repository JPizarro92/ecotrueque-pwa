import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateExchangePageRoutingModule } from './create-exchange-routing.module';

import { CreateExchangePage } from './create-exchange.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateExchangePageRoutingModule
  ],
  declarations: [CreateExchangePage]
})
export class CreateExchangePageModule {}
