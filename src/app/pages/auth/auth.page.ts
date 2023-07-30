import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  segmentValue = '1'
  constructor(private menuCtrl: MenuController) { }

  async ngOnInit() {
    //await this.menuCtrl.close();
  }


  ionViewDidEnter(){
    const menu = document.querySelector('ion-menu');
    menu?.setAttribute('disabled', 'true');
  }

  segmentChange(event: any){
    this.segmentValue = event.detail.value
  }

}
