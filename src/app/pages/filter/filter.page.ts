import { Component, OnInit } from '@angular/core';
import { Category, Post, User } from '../../interfaces/index';
import { CategoriesService } from '../../services/categories.service';
import { PostsService } from '../../services/posts.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit {

  title: string = "";
  user: User = {}
  categoryID = 0;
  posts: Post[] = [];
  category: Category = {};
  categories: Category[] = [];
  enable = true;
  constructor(
    private categoriesService: CategoriesService,
    private postsService: PostsService,
    private usersService: UsersService
  ) {}

  async ngOnInit() {
    const validar = await this.categoriesService.readCategories()
    if(validar){
      this.categories = this.categoriesService.getCategories()
    }
    this.user = this.usersService.getUser();
    this.title = "Filtros";

    this.following();
    this.postsService.newPost.subscribe((posts) => {
      this.posts.unshift(posts);
    });
  }

  reload(event?: any) {
    this.following(event, true);
    this.posts = [];
    this.enable = true;
  }

  following(event?: any, pull: boolean = false) {
    this.postsService
      .getPostsByCategory(pull, this.categoryID)
      .subscribe((posts) => {
        this.posts.push(...posts);
        if (event) {
          event.target.complete();
          if (posts.length === 0) {
            this.enable = false;
          }
        }
      });
  }

  categorySelect(category_id: any) {
    this.categoryID = category_id;
    this.following();
  }

  readCategoryID(event: any) {
    this.categoryID = event;
    this.reload();
  }
}
