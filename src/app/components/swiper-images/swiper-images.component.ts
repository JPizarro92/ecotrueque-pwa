import { Component, Input, OnInit } from '@angular/core';
import { IonicSlides } from '@ionic/angular';
import { environment } from '../../../environments/environment.prod';
import { Image } from '../../interfaces/index';

const URL = environment.url_assets

@Component({
  selector: 'app-swiper-images',
  templateUrl: './swiper-images.component.html',
  styleUrls: ['./swiper-images.component.scss'],
})
export class SwiperImagesComponent  implements OnInit {

  @Input() images: Image[] = []
  @Input() uid: string = ''
  url_image = ''

  swiperModules = [IonicSlides];
  constructor() { }

  ngOnInit() {}

}
