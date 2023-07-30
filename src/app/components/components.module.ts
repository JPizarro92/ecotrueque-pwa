import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstitutionalLogosFooterComponent } from './institutional-logos-footer/institutional-logos-footer.component';
import { BannerNewsComponent } from './banner-news/banner-news.component';
import { UserStarsComponent } from './user-stars/user-stars.component';
import { IonicModule } from '@ionic/angular';
import { SwiperImagesComponent } from './swiper-images/swiper-images.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './post/post.component';
import { HeaderComponent } from './header/header.component';



@NgModule({
  declarations: [
    InstitutionalLogosFooterComponent,
    SwiperImagesComponent,
    CategoryListComponent,
    BannerNewsComponent,
    UserStarsComponent,
    HeaderComponent,
    PostsComponent,
    PostComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    InstitutionalLogosFooterComponent,
    SwiperImagesComponent,
    CategoryListComponent,
    BannerNewsComponent,
    UserStarsComponent,
    HeaderComponent,
    PostsComponent
  ]
})
export class ComponentsModule { }
