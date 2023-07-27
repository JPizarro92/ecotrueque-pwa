import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  showMenu: boolean = true;
  url_base = '/ecotrueque/'
  public pages: any[] = [
    {title: 'Inicio', url:this.url_base+'home', icon:'home-outline'},
    {title: 'Filtro', url:this.url_base+'filter', icon:'options-outline'},
    {title: 'Publicaciones', url:this.url_base+'posts', icon:'pricetags-outline'},
    {title: 'Trueques', url:this.url_base+'exchanges', icon:'repeat-outline'}
  ];

  constructor() {}
}
