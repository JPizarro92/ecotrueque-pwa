import { Component, Input, OnInit } from '@angular/core';
import { IonicSlides } from '@ionic/angular';
import { Post, Category } from '../../../interfaces/index';
import { PostsService } from '../../../services/posts.service';
import { register } from 'swiper/element/bundle';

//register()

@Component({
  selector: 'app-posts-home',
  templateUrl: './posts-home.component.html',
  styleUrls: ['./posts-home.component.scss'],
})
export class PostsHomeComponent  implements OnInit {
  swiperModules = [IonicSlides]
  breakpoints = {
    200: {slidesPerView: 2},
    667: { slidesPerView: 3 },
    768: { slidesPerView: 4 },
    1280: { slidesPerView: 5 },
  };
  
  @Input() category: Category = {}
  posts: Post[] = []
 
  constructor(private postsService: PostsService) { }

  async ngOnInit() {
    this.postsService.getPostsByCategoryHome(this.category.id).subscribe(
      posts => {
        this.posts.push(...posts)
      }
    )
  }

}
