import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('../../pages/home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'filter',
        loadChildren: () =>
          import('../../pages/filter/filter.module').then(
            (m) => m.FilterPageModule
          ),
      },
      {
        path: 'account',
        loadChildren: () =>
          import('../../pages/account/account.module').then(
            (m) => m.AccountPageModule
          ),
      },
      {
        path: 'create-exchange',
        loadChildren: () =>
          import('../../pages/create-exchange/create-exchange.module').then(
            (m) => m.CreateExchangePageModule
          ),
      },
      {
        path: 'create-post',
        loadChildren: () =>
          import('../../pages/create-post/create-post.module').then(
            (m) => m.CreatePostPageModule
          ),
      },
      {
        path: 'exchanges',
        loadChildren: () =>
          import('../../pages/exchanges/exchanges.module').then(
            (m) => m.ExchangesPageModule
          ),
      },
      {
        path: 'posts',
        loadChildren: () =>
          import('../../pages/posts/posts.module').then((m) => m.PostsPageModule),
      },
      {
        path: 'exchange-view',
        loadChildren: () =>
          import('../../pages/exchange-view/exchange-view.module').then(
            (m) => m.ExchangeViewPageModule
          ),
      },
      {
        path: 'post-view',
        loadChildren: () =>
          import('../../pages/post-view/post-view.module').then(
            (m) => m.PostViewPageModule
          ),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
