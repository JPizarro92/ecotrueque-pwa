import { Component, Input, OnInit } from '@angular/core';
import { Post, User } from '../../../interfaces/index';
import { IonicModule, ModalController } from '@ionic/angular';
import { PostViewPage } from '../../post-view/post-view.page';
import { environment } from '../../../../environments/environment';
const URL = environment.url_assets
@Component({
  selector: 'app-post-home',
  templateUrl: './post-home.component.html',
  styleUrls: ['./post-home.component.scss'],
})
export class PostHomeComponent  implements OnInit {
  swiperModules = [IonicModule]
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
