import { Component, OnInit } from '@angular/core';
import { Category } from '../../interfaces/index';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  categories: Category[]=[]
  category: Category = {
    id: 0,
    name: 'Ultimas publicaciones',
    icon: 'earth-outline'
  }

  constructor(private categoryService: CategoriesService) { }

  async ngOnInit() {
    const validar = await this.categoryService.readCategories()
    if(validar){
      this.categories = this.categoryService.getCategories()
    }
    
  }

  reload(event?:any){
    if(event){
      event.target.complete()
    }
  }

}
