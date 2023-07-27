import { Component, OnInit } from '@angular/core';
import { Category, Post } from '../../interfaces/index';
import { CategoriesService } from '../../services/categories.service';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit {
  categoryID = 0;
  posts: Post[] = [];
  category: Category = {};
  categories: Category[] = [];
  enable = true;
  constructor(
    private categoryService: CategoriesService,
    private postsService: PostsService
  ) {}

  async ngOnInit() {
    const validar = await this.categoryService.readCategories()
    if(validar){
      this.categories = this.categoryService.getCategories()
    }
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
