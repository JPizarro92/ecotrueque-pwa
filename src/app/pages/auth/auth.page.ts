import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  segmentValue = '1'
  constructor() { }

  ngOnInit() {
  }

  segmentChange(event: any){
    this.segmentValue = event.detail.value
  }

}
