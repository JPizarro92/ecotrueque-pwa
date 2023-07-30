import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { ExchangesService } from '../../services/exchanges.service';
import { Exchange, User } from '../../interfaces/index';

@Component({
  selector: 'app-exchanges',
  templateUrl: './exchanges.page.html',
  styleUrls: ['./exchanges.page.scss'],
})
export class ExchangesPage implements OnInit {

  segmentValue = '1'
  exchangesSend: Exchange[] = []
  exchangesReceived: Exchange[] = []
  user: User = {}
  constructor(private usersService: UsersService,
              private exchangesService: ExchangesService) { }

  async ngOnInit() {

    this.user = this.usersService.getUser();

    await this.exchangesService.readSendExchangesByUser(this.user.id??'').subscribe(
      exchanges => {
        this.exchangesSend.push(...exchanges)
      }
    )

    await this.exchangesService.readReceivedExchangesByUser(this.user.id??'').subscribe(
      exchanges => {
        this.exchangesReceived.push(...exchanges)
      }
    )

    //console.log(this.exchangesSend)
    //console.log(this.exchangesReceived)

  }

  segmentChange(event:any){
    this.segmentValue = event.detail.value;
  }

  reload(event?:any){
    if(event){
      event.target.complete()
    }
  }

}
