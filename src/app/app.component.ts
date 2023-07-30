import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { register } from 'swiper/element/bundle';
import { CreatePostPage } from './pages/create-post/create-post.page';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  showMenu = true;
  url_base = '/ecotrueque/'
  menu = document.querySelector('ion-menu');
  selectedItem: number | null = null;
  public pages: any[] = [
    {title: 'Inicio', url:this.url_base+'home', icon:'home-outline'},
    {title: 'Filtro', url:this.url_base+'filter', icon:'options-outline'},
    {title: 'Publicaciones', url:this.url_base+'my-posts', icon:'pricetags-outline'},
    {title: 'Trueques', url:this.url_base+'exchanges', icon:'repeat-outline'}
  ];

  constructor(private modalCtrl: ModalController) {}

  createPost(){
    this.modalCtrl.create({
      component: CreatePostPage,
      //componentProps: this.post
    }).then(
      modalresp => {
        modalresp.present();
      }
    )
  }

  onItemClick(i: number) {
    if (this.selectedItem === i) {
      this.selectedItem = null;
    } else {
      this.selectedItem = i;
    }
  }

}
