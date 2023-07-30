import { Component, Input, OnInit } from '@angular/core';
import { Post, User } from '../../../interfaces/index';

@Component({
  selector: 'app-card-post',
  templateUrl: './card-post.component.html',
  styleUrls: ['./card-post.component.scss'],
})
export class CardPostComponent  implements OnInit {

  @Input() post: Post = {}
  @Input() user: User = {}
  
  constructor() { }

  ngOnInit() {
    
  }

}
