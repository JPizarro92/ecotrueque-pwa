import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateExchangePage } from './create-exchange.page';

const routes: Routes = [
  {
    path: '',
    component: CreateExchangePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateExchangePageRoutingModule {}
