import { Component, OnInit } from '@angular/core';
import { Post, User } from '../../interfaces/index';
import { PostsService } from '../../services/posts.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.page.html',
  styleUrls: ['./my-posts.page.scss'],
})
export class MyPostsPage implements OnInit {

  posts_ows: Post[] = [];
  user: User = {};
  uid = '';
  enable = true;
  constructor(
    private postsService: PostsService,
    private usersService: UsersService
  ) {}
  async ngOnInit() {
    this.user = await this.usersService.getUser();
    this.uid = this.user.id ? this.user.id : '';
    this.postsService.newPost.subscribe((post) => {
      this.posts_ows.unshift(post);
    });
    this.followings();
  }

  reload(event: any) {
    this.followings(event, true);
    this.posts_ows = [];
    this.enable = true;
  }

  // Solicitudes mediante el infinite scroll
  followings(event?: any, pull: boolean = false) {
    this.postsService.getUserPosts(pull, this.uid).subscribe((posts) => {
      this.posts_ows.push(...posts);
      if (event) {
        event.target.complete();
        if (posts.length === 0) {
          this.enable = false; //Deja de solicitar más información cuando ya no haya más registros
        }
      }
    });
  }

}
