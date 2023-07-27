import { Component, Input, OnInit } from '@angular/core';
import { IonicSlides, ModalController } from '@ionic/angular';
import { Post, User } from '../../interfaces/index';
import { PostViewPage } from '../../pages/post-view/post-view.page';
import { environment } from '../../../environments/environment.prod';
const URL = environment.url_assets
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent  implements OnInit {
  swiperModules = [IonicSlides]
  @Input() post: Post = {}
  user: User = {}
  url_image = ''
  url_avatar = ''
  name: string = ""
  constructor(private modalCtrl: ModalController) { }
  ngOnInit() {
    if(this.post.user){
      this.user = this.post.user
      this.name = this.post.user.name +" "+this.post.user.surname
      this.url_image = `${URL}/posts/${this.post.user_id}/posts/`
    }
    
    if(this.post.user?.avatar!='av-1.png'){
      this.url_avatar = `${URL}/avatars/${this.post.user_id}/`
    }else{
      this.url_avatar = `${URL}/avatars/`
    }
  }

  seePost(){
    this.modalCtrl.create({
      component: PostViewPage,
      componentProps: this.post
    }).then(
      modalresp => {
        modalresp.present();
      }
    )
  }
}
