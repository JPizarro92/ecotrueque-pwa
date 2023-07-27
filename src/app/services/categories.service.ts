import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { CategoriesResponse, Category } from '../interfaces';
import { environment } from '../../environments/environment';
import { Observable, map } from 'rxjs';

const URL = environment.url
@Injectable({
  providedIn: 'root'
})
export class CategoriesService implements OnInit{
  

  private categories: Category[] = []

  constructor(private http: HttpClient) { }
  
  ngOnInit(){
    this.readCategories();
  }

  /*readCategories(): Observable<Category[]>{
    return this.http.get<CategoriesResponse>(`${URL}/category`).pipe(
      map(({categories}) => categories)
    )
  }*/

  getCategories(){
    if(this.categories.length===0){
      this.readCategories()
    }
    return this.categories
  }


  readCategories(): Promise<boolean>{
    return new Promise<boolean>(resolve => {
      this.http.get<CategoriesResponse>(`${URL}/category`, {observe: 'response'})
      .subscribe({
        next: (resp: HttpResponse<CategoriesResponse>) => {
          this.categories = resp.body?.categories ?? [];
          resolve(true);
        },
        error: (err) => {
          resolve(false);
        }
      })
    })
  }

}
