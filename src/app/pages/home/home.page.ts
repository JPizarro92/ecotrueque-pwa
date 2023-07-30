import { Component, OnInit } from '@angular/core';
import { Category, User } from '../../interfaces/index';
import { CategoriesService } from '../../services/categories.service';
import { AppComponent } from '../../app.component';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  user: User = {};
  title: string = ""
  categories: Category[]=[]
  category: Category = {
    id: 0,
    name: 'Ultimas publicaciones',
    icon: 'earth-outline'
  }

  constructor(private categoryService: CategoriesService,
              private usersService: UsersService) {}

  ionViewDidEnter(){
    const menu = document.querySelector('ion-menu');
    menu?.setAttribute('disabled', 'false');
  }

  async ngOnInit() {
    const validar = await this.categoryService.readCategories();
    if(validar){
      this.categories = this.categoryService.getCategories();
    }
    this.user = this.usersService.getUser();
    this.title = "Inicio";
  }

  reload(event?:any){
    if(event){
      event.target.complete()
    }
  }

}
