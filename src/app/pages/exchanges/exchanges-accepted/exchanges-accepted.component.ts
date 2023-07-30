import { Component, Input, OnInit } from '@angular/core';
import { Exchange, User } from '../../../interfaces/index';
import { environment } from 'src/environments/environment';

const url_wwp_env = environment.url_whatsapp

@Component({
  selector: 'app-exchanges-accepted',
  templateUrl: './exchanges-accepted.component.html',
  styleUrls: ['./exchanges-accepted.component.scss'],
})
export class ExchangesAcceptedComponent  implements OnInit {

  @Input() exchanges_sent: Exchange[] = []
  @Input() exchanges_proposed: Exchange[] = []
  emailSubject = 'Hola quiero hacer un trueque';
  constructor() { }

  url_wpp = ''

  ngOnInit() {}

  whatsAppMessage(user: User){
    this.url_wpp = "https://wa.me/"+user.phone+"?`text=Hola deseo hacer un trueque`"
    window.open(this.url_wpp, "_blank")
  }

  emailMessage(user: User){
    const emailLink = `mailto:${user.email}?subject=${encodeURIComponent(this.emailSubject)}`;
    window.open(emailLink);
  }

}
