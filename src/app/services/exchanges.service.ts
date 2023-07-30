import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Exchange } from '../interfaces';
import { UsersService } from './users.service';
import { User, ExchangeResponse } from '../interfaces/index';
import { Observable, map } from 'rxjs';


const URL = environment.url

@Injectable({
  providedIn: 'root'
})
export class ExchangesService {

  user: User = {}

  constructor(private http: HttpClient,
              private usersService: UsersService) { }
  ngOnInit(): void {
    this.user = this.usersService.getUser()
  }
  


  createdExchange(exchange: Exchange){
    const headers = new HttpHeaders({
      'token': this.usersService.token ?? ''
    })
    return new Promise( resolve => {
      this.http.post(`${URL}/exchanges`,exchange, {observe:'response', headers}).subscribe(
        resp => {
          resolve(true)
        }
      )
    })
  }

  /*
  * Ojo a las solicitudes 
  * Trae los exchanges enviados y recibidos del usuario con login
  */

  readSendExchangesByUser(id: string): Observable<Exchange[]>{
    const headers = new HttpHeaders({'token': this.usersService.token ?? ''})
    const options = { headers: headers };
    return this.http.get<ExchangeResponse>(`${URL}/exchanges/s/user/${id}`, options).pipe(map(response => response.exchanges));
  }

  readReceivedExchangesByUser(id: string): Observable<Exchange[]> {
    const headers = new HttpHeaders({'token': this.usersService.token ?? ''});
    const options = { headers: headers };
    return this.http.get<ExchangeResponse>(`${URL}/exchanges/r/user/${id}`, options).pipe(map(response => response.exchanges));
  }
  
  updateExchange(exchange: Exchange){
    const headers = new HttpHeaders({'token': this.usersService.token ?? ''});
    return new Promise(resolve =>{
      this.http.put(`${URL}/exchanges/${exchange.id}`,exchange, {observe:'response', headers})
        .subscribe(
          resp => {
            resolve(true)
          }
        )
    })
  }

  async deleteExchange(exchange: Exchange){
    const headers = new HttpHeaders({'token': this.usersService.token ?? ''});
    console.log(exchange)
    return new Promise(resolve =>{
      this.http.delete(`${URL}/exchanges/${exchange.id}`, {observe:'response', headers})
        .subscribe(
          (resp) => {
            console.log(resp)
            resolve(true);
          },
          (error) => {
            console.log(error)
            resolve(false);
          }
        )
    })
  }
  
}
