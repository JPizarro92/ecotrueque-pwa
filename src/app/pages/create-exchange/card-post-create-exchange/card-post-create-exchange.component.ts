import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../../interfaces/index';

@Component({
  selector: 'app-card-post-create-exchange',
  templateUrl: './card-post-create-exchange.component.html',
  styleUrls: ['./card-post-create-exchange.component.scss'],
})
export class CardPostCreateExchangeComponent  implements OnInit {
  @Input() post: Post = {}
  @Input() user_id = ''
  constructor() { }

  ngOnInit() {}

}
