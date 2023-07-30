import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../interfaces/index';
import { environment } from '../../../../environments/environment.prod';

const URL = environment.url_assets

@Component({
  selector: 'app-header-users',
  templateUrl: './header-users.component.html',
  styleUrls: ['./header-users.component.scss'],
})
export class HeaderUsersComponent  implements OnInit {

  @Input() user_post_proposed: User = {}
  @Input() user_post_shared: User = {}
  url_avatar = ''
  constructor() { }

  ngOnInit() {
    this.url_avatar = `${URL}/avatars/`
  }

}
