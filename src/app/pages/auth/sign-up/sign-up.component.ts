import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../../services/users.service';
import { LoadingController, NavController } from '@ionic/angular';
import { User } from '../../../interfaces/index';
import { UiServiceService } from '../../../services/ui-service.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  private loading: any;

  form: any;
  type = true;
  user: User = {
    name: '',
    surname: '',
    email: '',
    password: '',
    role: 'USER',
    avatar: 'av-1.png',
  };

  constructor(
    private userService: UsersService,
    private uiService: UiServiceService,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    
  ) {
    
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      name: new FormControl(null, { validators: [Validators.required] }),
      surname: new FormControl(null, { validators: [Validators.required] }),
      email: new FormControl(null, { validators: [Validators.required] }),
      password: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(8)],
      }),
    });
  }

  changeType() {
    this.type = !this.type;
  }

  async onSubmit() {
    this.loadingCtrl
      .create({
        message: 'Registro de usuario....',
      })
      .then((overlay) => {
        this.loading = overlay;
        this.loading.present();

        if (!this.form.valid) {
          this.loading.dismiss();
          this.form.markAllAsTouched();
          return;
        }

        return this.userService.signUp(this.user);
      })
      .then((validate) => {
        this.loading.dismiss();
        if (validate) {
          
          this.navCtrl.navigateRoot('/ecotrueque/home', { animated: true });
        } else {
          this.uiService.messageAlert(
            'Sign up - Error',
            'Al parecer algo salio mal, verifica que todos los campos se encuentren llenados correctamente.'
          );
        }
      })
      .catch((error) => {
        this.loading.dismiss();
        console.error(error);
      });
  }
}
