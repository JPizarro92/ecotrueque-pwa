import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExchangeViewPage } from './exchange-view.page';

const routes: Routes = [
  {
    path: '',
    component: ExchangeViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExchangeViewPageRoutingModule {}
