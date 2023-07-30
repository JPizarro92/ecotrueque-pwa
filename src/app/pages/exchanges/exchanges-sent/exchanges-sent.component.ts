import { Component, Input, OnInit } from '@angular/core';
import { Exchange } from '../../../interfaces/index';
import { ExchangesService } from '../../../services/exchanges.service';
import { UiServiceService } from '../../../services/ui-service.service';
import { environment } from '../../../../environments/environment.prod';

const URL = environment.url_assets

@Component({
  selector: 'app-exchanges-sent',
  templateUrl: './exchanges-sent.component.html',
  styleUrls: ['./exchanges-sent.component.scss'],
})
export class ExchangesSentComponent  implements OnInit {

  @Input() exchanges: Exchange[] = []
  url_avatar = ''
  constructor(private exchangesService: ExchangesService,
              private uiService: UiServiceService) { }

  ngOnInit() {
    this.url_avatar = `${URL}/avatars/`
    console.log(this.exchanges)
  }

  detailButton(exchange: Exchange){
    console.log('Detalle')
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
