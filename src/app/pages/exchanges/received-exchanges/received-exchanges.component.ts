import { Component, Input, OnInit } from '@angular/core';
import { Exchange } from '../../../interfaces/index';
import { ExchangesService } from '../../../services/exchanges.service';
import { UiServiceService } from '../../../services/ui-service.service';
import { environment } from '../../../../environments/environment.prod';

const URL = environment.url_assets

@Component({
  selector: 'app-received-exchanges',
  templateUrl: './received-exchanges.component.html',
  styleUrls: ['./received-exchanges.component.scss'],
})
export class ReceivedExchangesComponent  implements OnInit {
  @Input() exchanges: Exchange[] = []
  confirm = false;
  url_avatar = ''
  public alertButtons = [
    {
      text: 'Cancelar',
      role: 'cancel',
      handler: () => {
        this.confirm = false;
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        this.confirm = true;
      },
    },
  ];
  constructor(private exchangesService: ExchangesService,
              private uiService: UiServiceService) { }

  ngOnInit() {
    this.url_avatar = `${URL}/avatars/`
  }

  async rejectButton(exchange: Exchange){
    if(this.confirm && exchange.status!='access'){
      exchange.status = 'reject'
      if (await this.exchangesService.updateExchange(exchange)){
        this.uiService.presentToast('Trueque aceptado')
      }
    }
  }

  async acceptButton(exchange: Exchange){
    
    if(this.confirm && exchange.status!='access'){
      exchange.status = 'access'
      if (await this.exchangesService.updateExchange(exchange)){
        this.uiService.presentToast('Trueque aceptado')
      }
    }

    if(exchange.status==='access'){
      this.uiService.messageAlert("Aceptar Trueque", "Tu ya haz aceptado este trueque.")
    }
    console.log(this.confirm)
  }

}
