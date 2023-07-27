import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../../services/users.service';
import { NavController } from '@ionic/angular';
import { User } from '../../../interfaces/index';
import { UiServiceService } from '../../../services/ui-service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent  implements OnInit {

  form: any;
  type = true;
  user: User ={
    name: '',
    surname: '',
    email: '',
    password: '',
    role: 'USER',
    avatar: 'av-1.png'
  }

  constructor(private userService: UsersService,
              private uiService: UiServiceService,
              private navCtrl: NavController) { }

  ngOnInit() {
    this.initForm()
  }

  initForm(){
    this.form = new FormGroup({
      name: new FormControl(null,{validators: [Validators.required]}),
      surname: new FormControl(null,{validators: [Validators.required]}),
      email: new FormControl(null,{validators: [Validators.required]}),
      password: new FormControl(null,{validators: [Validators.required, Validators.minLength(8)]})
    })
  }

  changeType(){
    this.type = !this.type
  }

  async onSubmit(){
    if(!this.form.valid){
      this.form.markAllAsTouched();
      return
    }

    const validate = await this.userService.signUp(this.user)
    
    if (validate){
      this.navCtrl.navigateRoot('/ecotrueque/home', {animated: true})
    }else{
      this.uiService.messageAlert('Sign up - Error','Tuvimos problemas al resgistrar tu cuenta.');
    }

  }

}
