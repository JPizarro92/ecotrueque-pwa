import { Component, OnInit } from '@angular/core';
import { IonicSlides, ModalController, NavParams } from '@ionic/angular';
import { Category, Image, Post, User } from '../../interfaces/index';
import { UiServiceService } from '../../services/ui-service.service';
import { UsersService } from '../../services/users.service';
import { CreateExchangePage } from '../create-exchange/create-exchange.page';
import { environment } from '../../../environments/environment.prod';

const URL = environment.url_assets;

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.page.html',
  styleUrls: ['./post-view.page.scss'],
})
export class PostViewPage implements OnInit {

  swiperModules = [IonicSlides]

  post: Post = {};
  user: User = {};
  userLogin: User = {}
  url_image = '';
  url_avatar = '';
  category: Category = {};
  images: Image[] = [];

  constructor(
    private uiService: UiServiceService,
    private usersService: UsersService,
    private modalCtrl: ModalController,
    private navParams: NavParams
  ) {
    this.post = this.navParams.data;
  }

  async ngOnInit() {
    //this.url_avatar = `${URL}/avatars/`
    this.post = this.navParams.data;
    if (this.post) {
      this.user = this.post.user ? this.post.user : {};
      this.category = this.post.category ? this.post.category : {};
      this.images = this.post.images ? this.post.images : [];
      this.url_image = `${URL}/posts/${this.user.id}/posts/`
    } else {
      this.modalCtrl.dismiss();
    }

    if(this.user.avatar!='av-1.png'){
      this.url_avatar = `${URL}/avatars/${this.user.id}/`
    }else{
      this.url_avatar = `${URL}/avatars/`
    }

    this.userLogin = this.usersService.getUser();
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  goExchange(){
    if (this.user.id === this.userLogin.id){
      this.uiService.messageAlert("Realizar Trueque", 'No puedes realizar trueques de tus propios productos')
      return
    }
    this.modalCtrl.create({
      component: CreateExchangePage,
      componentProps: this.post
    }).then(
      modal_resp => {
        modal_resp.present()
      }
    )
  }

}
