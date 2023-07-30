import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';
import { UserLogin } from '../../../interfaces/index';
import { UiServiceService } from '../../../services/ui-service.service';
import { UsersService } from '../../../services/users.service';
import { AppComponent } from '../../../app.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent  implements OnInit {

  form: any;
  type = true
  //isLoading: boolean = false
  private loading: any;
  
  user: UserLogin= {
    email: '',
    password: ''
  }

  constructor(private userService: UsersService,
              private navCtrl: NavController,
              private loadingCtrl: LoadingController,
              private uiService: UiServiceService,
              private appComponent: AppComponent) { }

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

  async onSubmit() {
    this.loadingCtrl
      .create({
        message: 'Inicio de sesión....'
      })
      .then((overlay) => {
        this.loading = overlay;
        this.loading.present();
  
        if (!this.form.valid) {
          this.form.markAllAsTouched();
          throw new Error('Form is not valid');
        }
  
        return this.userService.login(this.form.value.email, this.form.value.password);
      })
      .then((validate) => {
        if (validate) {
          this.appComponent.showMenu = true;
          const menu = this.appComponent.menu
          menu?.setAttribute('side','start');
          
          this.navCtrl.navigateRoot('/ecotrueque/home', { animated: true });
        } else {
          this.uiService.messageAlert('Error', 'Usuario y contraseña incorrectos.');
        }
      })
      .catch((error) => {
        // Handle any errors that occur during loading or login process
        console.error(error);
      })
      .finally(() => {
        // Ensure that the loading is dismissed regardless of success or error
        if (this.loading) {
          this.loading.dismiss();
        }
      });
  }
  

}
