import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostViewPageRoutingModule } from './post-view-routing.module';

import { PostViewPage } from './post-view.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    PostViewPageRoutingModule
  ],
  declarations: [PostViewPage]
})
export class PostViewPageModule {}
