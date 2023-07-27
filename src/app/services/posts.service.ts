import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { PostsResponse, Post, User } from '../interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UsersService } from './users.service';
import { LoadingController } from '@ionic/angular';

const URL = environment.url

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  //? pull feature is to reset to 0 the page number when the page is refreshing
  pageGetPostsByCategory = 0
  pageGetPostByUser = 0
  pageGetUserPosts = 0
  newPost = new EventEmitter<Post>()
  viewPost = new EventEmitter<Post>()

  user: User = {}
  constructor(private http:HttpClient,
              private usersService: UsersService,
              private loadingCtrl: LoadingController) { }

  //* The next function is for created a new post
  createdPosts(post: Post){
    const headers = new HttpHeaders({
      'token': this.usersService.token ?? ''
    })
    this.user = this.usersService.getUser()
    post.user_id = this.user.id? this.user.id : ''
    post.user = this.user 

    return new Promise(resolve=>{
      this.http.post(`${URL}/posts`, post, {observe:'response', headers}).subscribe(
        resp => {
          post = resp.body? resp.body:{}
          this.newPost.emit(post)
          resolve(true)
        }
      )
    })
  }

  async viewPostsEmit(post: Post){
    await this.viewPost.emit(post);
  }

  async uploadImages(formData: FormData){

    const loading = await this.loadingCtrl.create({
      message: 'Subiendo imagen...'
    });
    await loading.present();
    const headers = new HttpHeaders({
      'token': this.usersService.token ?? '',
    })
    
    return new Promise(resolve => {
      this.http.post(`${URL}/posts/upload`, formData, {observe: 'response', headers})
    .subscribe({
      next: (resp: HttpResponse<any>) => {
        loading.dismiss()
        resolve(true)
      },
      error:(err) =>{
        loading.dismiss()
        resolve(false)
      }
    });

    })
    
  }

  //* The next functions are used to get posts
  getPostsByCategory(pull: boolean=false, categoryId: number=0): Observable<Post[]>{
    if (pull){
      this.pageGetPostsByCategory=0;
    }
    this.pageGetPostsByCategory ++;
    return this.http.get<PostsResponse>(`${ URL }/posts/category/${categoryId}?page=${this.pageGetPostsByCategory}`)
    .pipe(
      map(({posts})=> posts)
    )
  }

  getPostsByCategoryHome(categoryId: number=0): Observable<Post[]>{
    return this.http.get<PostsResponse>(`${ URL }/posts/category/${categoryId}?page=${0}`)
    .pipe(
      map(({posts})=> posts)
    )
  }

  getUserPosts(pull: boolean=false, userId: string): Observable<Post[]>{
    if (pull){
      this.pageGetUserPosts=0;
    }
    this.pageGetUserPosts ++;
    return this.http.get<PostsResponse>(`${ URL }/posts/user/${userId}?page=${this.pageGetUserPosts}`)
    .pipe(
      map(({posts})=> posts)
    )
  }

  updatePost(post: Post){
    const headers = new HttpHeaders({
      'token': this.usersService.token ?? ''
    })

    return new Promise( resolve => {
      this.http.put(`${URL}/posts/${post.id}`, post, {observe: 'response', headers})
        .subscribe(
          resp => {
            resolve(true)
          }
        )
    })
  }

  deletePost(post_id: number){
    const headers = new HttpHeaders({
      'token': this.usersService.token ?? ''
    })

    return new Promise(resolve => {
      this.http.delete(`${URL}/posts/${post_id}`, {observe: 'response', headers})
        .subscribe(
          resp => {
            resolve(true)
          }
        )
    })

  }

}