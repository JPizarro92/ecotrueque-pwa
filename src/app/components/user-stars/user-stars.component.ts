import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment.prod';

const URL = environment.url_assets

@Component({
  selector: 'app-user-stars',
  templateUrl: './user-stars.component.html',
  styleUrls: ['./user-stars.component.scss'],
})
export class UserStarsComponent  implements OnInit {

  @Input() rating: number = 0;
  //@Input() userID: string = ''
  star_int: number = 0;
  star_dec: number = 0;

  constructor() { }

  ngOnInit() {
    if (this.rating != 0) {
      this.star_int = Math.floor(this.rating);
      this.star_dec = this.rating - this.star_int;
    }
  }

  //* function for created array gor created the star
  range(length: number): number[] {
    return Array.from({ length }, ( _, index) => index);
  }

}
