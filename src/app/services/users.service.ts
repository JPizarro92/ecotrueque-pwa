import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

import { environment } from '../../environments/environment';
import { User } from '../interfaces';
import { LoadingController, NavController } from '@ionic/angular';

const URL = environment.url

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  token: string | null | undefined = null
  private user: User | null = null

  constructor(private http: HttpClient, 
              private storage: Storage,
              private navCtrl: NavController,
              private loadingCtrl: LoadingController) {
                this.initStorage();
              }
  
  async initStorage(){
    await this.storage.create()
  }
  
  getUser() {
    if (!this.user?.id) {
      this.validateToken()
    }
    return { ...this.user }
  }

  signUp(user: User){
    return new Promise(resolve => {
      this.http.post(`${URL}/signup`, user, { observe: 'response' })
        .subscribe({
          next: (resp: HttpResponse<any>) => {
            if (resp.body['token']) {
              this.saveTokenStorage(resp.body.token)
              resolve(true)
            }
          },
          error: (error) => {
            this.token = null
            this.storage.clear()
            resolve(false)
          }
        })
    })
  }

  async login(email: string, password: string){
    const data = { email, password}  
    return await new Promise(
      resolve => {
        this.http.post(`${URL}/login`, data, { observe: 'response' })
          .subscribe({
            next: (resp: HttpResponse<any>) => {
              resolve(true)
              this.saveTokenStorage(resp.body.token)
            },
            error: (error) => {
              this.token = null
              this.storage.clear()
              resolve(false)
            }
          })
      }
    )
  }

  async updateUser(userUpdated: User): Promise<boolean> {
    await this.loadToken()
    if (!this.token) {
      this.storage.clear()
      this.navCtrl.navigateRoot('/login')
      return Promise.resolve(false)
    }
    return new Promise<boolean>(resolve => {
      const headers = new HttpHeaders({
        'token': this.token ?? ''
      })
      this.http.put(`${URL}/users/${this.user?.id}`, userUpdated, { observe: 'response', headers })
        .subscribe({
          next: (resp: HttpResponse<User>) => {
            resolve(true)
          },
          error:(error)=>{
            this.navCtrl.navigateRoot('/login')
            resolve(false)
          }
        })
    })
  }

  async validateToken(): Promise<boolean> {
    await this.loadToken()
    if (!this.token) {
      this.storage.clear()
      this.navCtrl.navigateRoot('/login')
      return Promise.resolve(false)
    }
    return new Promise<boolean>(resolve => {
      const headers = new HttpHeaders({
        'token': this.token ?? ''
      })
      this.http.get(`${URL}/validate`, { observe: 'response', headers },)
        .subscribe({
          next: (resp: HttpResponse<User>) => {
            this.user = resp.body
            resolve(true)
          },
          error: (error) => {
            this.navCtrl.navigateRoot('/login')
            resolve(false)
          }
        })
    })
  }

  async loadToken(){
    this.token = await this.storage.get('token')
  }

  async saveTokenStorage(token:string){
    this.token = token
    this.storage.clear()
    await this.storage.set('token', this.token)
  }
  
  async updateAvatar(formData: FormData){
    const loading = await this.loadingCtrl.create({
      message: 'Subiendo imagen...'
    });

    await loading.present();
    const headers = new HttpHeaders({
      'token': this.token ?? '',
    })

    return new Promise(resolve =>{
      this.http.post(`${URL}/avatar`,formData,{observe:'response', headers})
      .subscribe({
        next: (resp: HttpResponse<any>)=>{
          const nameFile: string = resp.body.file
          if (this.user){
            this.user.avatar= nameFile
          }
          loading.dismiss()
          resolve(true)
        },
        error: (err)=>{
          loading.dismiss()
          resolve(true)
        }
      })
    })

  }

}
