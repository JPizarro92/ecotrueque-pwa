import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExchangesPageRoutingModule } from './exchanges-routing.module';

import { ExchangesPage } from './exchanges.page';
import { ComponentsModule } from '../../components/components.module';
import { ExchangesSentComponent } from './exchanges-sent/exchanges-sent.component';

import { ExchangesAcceptedComponent } from './exchanges-accepted/exchanges-accepted.component';
import { CardPostExchangeComponent } from './card-post-exchange/card-post-exchange.component';
import { ReceivedExchangesComponent } from './received-exchanges/received-exchanges.component';
import { CardPostComponent } from './card-post/card-post.component';
import { SentExchangesComponent } from './sent-exchanges/sent-exchanges.component';
import { HeaderUsersComponent } from './header-users/header-users.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ExchangesPageRoutingModule
  ],
  declarations: [
    ExchangesPage,
    CardPostComponent,
    HeaderUsersComponent,
    ExchangesSentComponent,
    SentExchangesComponent,
    ReceivedExchangesComponent,
    ExchangesAcceptedComponent,
    CardPostExchangeComponent
  ]
})
export class ExchangesPageModule {}
