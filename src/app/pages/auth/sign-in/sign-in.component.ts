import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { UserLogin } from '../../../interfaces/index';
import { UiServiceService } from '../../../services/ui-service.service';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent  implements OnInit {

  form: any;
  type = true
  //isLoading: boolean = false

  user: UserLogin= {
    email: '',
    password: ''
  }

  constructor(private userService: UsersService,
              private navCtrl: NavController,
              private uiService: UiServiceService) { }

  ngOnInit() {
    this.initForm()
  }

  initForm(){
    this.form = new FormGroup({
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

    const validate = await this.userService.login(this.form.value.email, this.form.value.password)

    if (validate){
      this.navCtrl.navigateRoot('/ecotrueque/home', {animated: true})
    }else{
      this.uiService.messageAlert('Error','Usuario y contraseña incorrectos.')
    }


  }

}
