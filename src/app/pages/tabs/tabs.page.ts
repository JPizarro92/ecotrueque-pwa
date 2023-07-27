import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreatePostPage } from '../create-post/create-post.page';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private modalCtrl: ModalController) {}

  createPost(){
    this.modalCtrl.create({
      component: CreatePostPage,
      //componentProps: this.post
    }).then(
      modalresp => {
        modalresp.present();
      }
    )
  }

}
