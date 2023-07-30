import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateExchangePageRoutingModule } from './create-exchange-routing.module';

import { CreateExchangePage } from './create-exchange.page';
import { ComponentsModule } from '../../components/components.module';
import { CardPostCreateExchangeComponent } from './card-post-create-exchange/card-post-create-exchange.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    CreateExchangePageRoutingModule
  ],
  declarations: [CreateExchangePage, CardPostCreateExchangeComponent]
})
export class CreateExchangePageModule {}
