import { Component, Input, OnInit } from '@angular/core';
import { Post, User } from '../../../interfaces/index';

@Component({
  selector: 'app-card-post-exchange',
  templateUrl: './card-post-exchange.component.html',
  styleUrls: ['./card-post-exchange.component.scss'],
})
export class CardPostExchangeComponent  implements OnInit {

  @Input() post: Post = {}

  user: User = {}
  avatar: string = ''
  full_name: string = ''
  constructor() { }

  ngOnInit() {
    //if(this.post){
      this.user = this.post.user??{};
      this.avatar = this.user.avatar??'';
      this.full_name = this.user.name??'' + ' ' + this.user.surname??'' 
      //console.log(this.user)
    //}
  }

}
