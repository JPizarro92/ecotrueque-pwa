import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from '../../interfaces/index';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent  implements OnInit {
  @Input() categories: Category[]=[];
  @Output() categorySelect: EventEmitter<any> = new EventEmitter();
  @Input() categoryID = '0'
  constructor() { }

  ngOnInit() {}

  selectCategory(event: any){
    this.categorySelect.emit(event.detail.value)
  }

}
