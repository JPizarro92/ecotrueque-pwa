import { Component, Input, OnInit } from '@angular/core';
import { Image } from '../../interfaces';
import { IonicSlides } from '@ionic/angular';

@Component({
  selector: 'app-banner-news',
  templateUrl: './banner-news.component.html',
  styleUrls: ['./banner-news.component.scss'],
})
export class BannerNewsComponent implements OnInit {
  //@Input() images: Image[] = []
  images: Image[] = [
    { image: 'assets/img/messages/eco1.jpg', status: true },
    { image: 'assets/img/messages/eco2.png', status: true },
    { image: 'assets/img/messages/eco3.jpg', status: true },
    { image: 'assets/img/messages/eco4.jpg', status: true },
    { image: 'assets/img/messages/eco5.jpg', status: true },
  ];
  swiperModules = [IonicSlides];
  breakpoints = {
    667: { slidesPerView: 2 },
    768: { slidesPerView: 3 },
    1280: { slidesPerView: 5 },
  };
  constructor() {}

  ngOnInit() {}
}
