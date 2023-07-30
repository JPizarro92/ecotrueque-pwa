import { Component, OnInit } from '@angular/core';
import { Exchange, Post, User } from '../../interfaces/index';
import { ModalController, NavParams } from '@ionic/angular';
import { PostsService } from '../../services/posts.service';
import { UsersService } from '../../services/users.service';
import { ExchangesService } from '../../services/exchanges.service';
import { UiServiceService } from '../../services/ui-service.service';

@Component({
  selector: 'app-create-exchange',
  templateUrl: './create-exchange.page.html',
  styleUrls: ['./create-exchange.page.scss'],
})
export class CreateExchangePage implements OnInit {

  post_shared: Post = {}
  proposed_post: Post = {}
  posts_shared: Post[] = []
  user: User = {}
  uid = ''
  exchange: Exchange = {}
  url_image = '';
  url_avatar = '';
  enable = true
  selectedPostId: string = '';

  constructor(private modalCtrl: ModalController,
              private navParams: NavParams,
              private postsService: PostsService,
              private usersService: UsersService,
              private exchangesService: ExchangesService,
              private uiService: UiServiceService) { }

  async ngOnInit() {
    this.post_shared = this.navParams.data;
    this.user = this.usersService.getUser();
    this.uid = this.user.id? this.user.id : ''
    this.followings()
  }

  async doExchange(){
    this.exchange.post_user_id = this.post_shared.user_id
    this.exchange.post_user = this.post_shared.user
    this.exchange.post_shared_id = this.post_shared.id
    this.exchange.post_shared = this.post_shared
    this.exchange.proposed_user_id = this.proposed_post.user_id
    this.exchange.proposed_user = this.proposed_post.user
    this.exchange.proposed_post_id = this.proposed_post.id
    this.exchange.proposed_post = this.proposed_post
    this.exchange.status = 'send'
    
    if (!this.proposed_post.id){
      this.uiService.messageAlert("Crear Trueque","Debes proponer un articulo de tus publicaciones.")
    }
    
    if (await this.exchangesService.createdExchange(this.exchange)){
      this.modalCtrl.dismiss()
      this.uiService.presentToast('Exchange creado')
    }
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  onRadioChange(event: any) {
    this.selectedPostId = event.detail.value;
    this.posts_shared.forEach( (post: any) => {
      if (post.id == parseInt(this.selectedPostId)){
        this.proposed_post = post
      }
    })
  }

  reload(event: any){
    this.followings(event, true)
    this.posts_shared = []
    this.enable = true
    this.followings()
  }

  followings(event?: any, pull: boolean = false){
    this.postsService.getUserPosts(pull, this.uid).subscribe(
      posts => {
        this.posts_shared.push(...posts)
        if(event){
          event.target.complete()
          if(posts.length===0){
            this.enable=false 
          }
        }
      }
    )
  }

}
