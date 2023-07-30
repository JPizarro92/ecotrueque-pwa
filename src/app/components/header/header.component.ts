import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../interfaces/index';
import { ModalController } from '@ionic/angular';
import { AccountPage } from '../../pages/account/account.page';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  @Input() user: User = {}
  @Input() title: string = ""

  fullName : string = ""
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    this.fullName = this.user.name + "" + this.user.surname
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  goAccount(){
    
    this.modalCtrl.create({
      component: AccountPage,
      componentProps: this.user
    }).then(
      modal_resp => {
        modal_resp.present();
        modal_resp.onDidDismiss().then(resp =>{
          if(resp.data != null){
            this.user = resp.data
          }
        })
      }
    )
  }

}
