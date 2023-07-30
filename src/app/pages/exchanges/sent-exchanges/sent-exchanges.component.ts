import { Component, Input, OnInit } from '@angular/core';
import { Exchange } from '../../../interfaces/index';
import { environment } from '../../../../environments/environment.prod';
import { ExchangesService } from '../../../services/exchanges.service';

const URL = environment.url_assets

@Component({
  selector: 'app-sent-exchanges',
  templateUrl: './sent-exchanges.component.html',
  styleUrls: ['./sent-exchanges.component.scss'],
})
export class SentExchangesComponent  implements OnInit {
  @Input() exchanges: Exchange[] = []
  url_avatar = ''
  constructor(private exchangesService: ExchangesService) { }

  ngOnInit() {
    this.url_avatar = `${URL}/avatars/`
  }

  async deleteButton(exchange: Exchange){
    //await this.exchangesService.deleteExchange(exchange)
    if (await this.exchangesService.deleteExchange(exchange)){
      //this.exchanges = this.exchanges.filter(e => e.id !== exchange.id)
      //this.uiService.presentToast('Trueque eliminado')
    }
  }

  editButton(exchange: Exchange){
    console.log('Editar')
  }

}
