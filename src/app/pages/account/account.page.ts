import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { UiServiceService } from '../../services/ui-service.service';
import {
  ModalController,
  NavParams,
  PickerController,
  Platform,
} from '@ionic/angular';
import { User } from '../../interfaces/index';
import { NgForm } from '@angular/forms';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import { Filesystem } from '@capacitor/filesystem';
import { Geolocation } from '@capacitor/geolocation';
import { environment } from '../../../environments/environment.prod';
import { Observable } from 'rxjs';

const URL = environment.url_assets;

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  provincias = [
    {
      provincia: 'Azuay',
      ciudades: ['Cuenca', 'Gualaceo', 'Chordeleg'],
    },
    {
      provincia: 'Bolívar',
      ciudades: ['Guaranda', 'Chillanes', 'Chimbo'],
    },
    {
      provincia: 'Cañar',
      ciudades: ['Azogues', 'Biblián', 'La Troncal'],
    },
    {
      provincia: 'Carchi',
      ciudades: ['Tulcán', 'Bolívar', 'Mira'],
    },
    {
      provincia: 'Chimborazo',
      ciudades: ['Riobamba', 'Guano', 'Alausí'],
    },
    {
      provincia: 'Cotopaxi',
      ciudades: ['Latacunga', 'La Maná', 'Saquisilí'],
    },
    {
      provincia: 'El Oro',
      ciudades: ['Machala', 'Pasaje', 'Santa Rosa'],
    },
    {
      provincia: 'Esmeraldas',
      ciudades: ['Esmeraldas', 'Atacames', 'Muisne'],
    },
    {
      provincia: 'Galápagos',
      ciudades: ['Puerto Baquerizo Moreno', 'Puerto Ayora', 'Isla Isabela'],
    },
    {
      provincia: 'Guayas',
      ciudades: ['Guayaquil', 'Durán', 'Samborondón'],
    },
    {
      provincia: 'Imbabura',
      ciudades: ['Ibarra', 'Otavalo', 'Cotacachi'],
    },
    {
      provincia: 'Loja',
      ciudades: ['Loja', 'Catamayo', 'Zapotillo'],
    },
    {
      provincia: 'Los Ríos',
      ciudades: ['Babahoyo', 'Quevedo', 'Vinces'],
    },
    {
      provincia: 'Manabí',
      ciudades: ['Portoviejo', 'Manta', 'Jipijapa'],
    },
    {
      provincia: 'Morona Santiago',
      ciudades: ['Macas', 'Gualaquiza', 'Santiago'],
    },
    {
      provincia: 'Napo',
      ciudades: ['Tena', 'Archidona', 'Carlos Julio Arosemena Tola'],
    },
    {
      provincia: 'Orellana',
      ciudades: [
        'Francisco de Orellana',
        'La Joya de los Sachas',
        'Puerto Francisco de Orellana',
      ],
    },
    {
      provincia: 'Pastaza',
      ciudades: ['Puyo', 'Mera', 'Santa Clara'],
    },
    {
      provincia: 'Pichincha',
      ciudades: ['Quito', 'Sangolquí', 'Cayambe'],
    },
    {
      provincia: 'Santa Elena',
      ciudades: ['Santa Elena', 'Salinas', 'La Libertad'],
    },
    {
      provincia: 'Santo Domingo de los Tsáchilas',
      ciudades: [
        'Santo Domingo',
        'La Concordia',
        'Santo Domingo de los Colorados',
      ],
    },
    {
      provincia: 'Sucumbíos',
      ciudades: ['Nueva Loja', 'Shushufindi', 'Cuyabeno'],
    },
    {
      provincia: 'Tungurahua',
      ciudades: ['Ambato', 'Baños', 'Píllaro'],
    },
    {
      provincia: 'Zamora Chinchipe',
      ciudades: ['Zamora', 'Yantzaza', 'Zumbi'],
    },
  ];

  selectedProvincia: any;
  selectedCiudad: any;

  form: any;
  type = true;
  rating: number = 0;
  starInt: number = 0;
  starDec: number = 0;
  fullName: string = '';
  phoneNumber: string = '+593';
  loadingGeolocation = false; //* Used for allow geolocation
  enabledEditMode: boolean = false; //* Enabled editing form
  avatar: string = 'av-1.png';

  userLogin: User = {};
  user = {
    id: '',
    name: '',
    surname: '',
    avatar: '',
    email: '',
    phone: '',
    location: '',
    position: false,
    birth_date: new Date(),
    rating_score: 0,
    provincia: '',
    cuidad: ''
  };
  url_avatar = '';

  constructor(
    private uiService: UiServiceService,
    private modalCtrl: ModalController,
    private userService: UsersService,
    private pickerController: PickerController,
    private navParams: NavParams,
    private platform: Platform
  ) {}

  ngOnInit() {
    //this.userLogin = this.userService.getUser();
    this.userLogin = this.navParams.data;
    if (this.userLogin.location && this.userLogin.location.trim() !== "") {
      const location: string[] = this.userLogin.location.split(',');
      this.selectedProvincia = location[0] || '';
      this.selectedCiudad = location[1] || '';
    }
    
    this.user = {
      id: this.userLogin.id ? this.userLogin.id : '',
      name: this.userLogin.name ? this.userLogin.name : '',
      surname: this.userLogin.surname ? this.userLogin.surname : '',
      avatar: this.userLogin.avatar ? this.userLogin.avatar : 'av-1.png',
      email: this.userLogin.email ? this.userLogin.email : '',
      phone: this.userLogin.phone ? this.userLogin.phone : '',
      location: this.userLogin.location ? this.userLogin.location : '',
      position: this.userLogin.position ? this.userLogin.position : false,
      birth_date: this.userLogin.birth_date
        ? this.userLogin.birth_date
        : new Date(),
      rating_score: this.userLogin.rating_score
        ? this.userLogin.rating_score
        : 0,
      provincia: this.selectedProvincia,
      cuidad: this.selectedCiudad
    };

    this.fullName = `${this.userLogin.name} ${this.userLogin.surname}`;
    this.rating = this.userLogin.rating_score ? this.userLogin.rating_score : 0;
    if(this.user.phone.length>4){
      this.phoneNumber = this.user.phone;
    }
    
    


    if (this.rating != 0) {
      this.starInt = Math.floor(this.rating);
      this.starDec = this.rating - this.starInt;
    }
    if (this.user.avatar != 'av-1.png') {
      this.url_avatar = `${URL}/avatars/${this.user.id}/`;
    } else {
      this.url_avatar = `${URL}/avatars/`;
    }
  }

  

  async updateUser(fUpdated: NgForm) {
    if (fUpdated.invalid) {
      return;
    }
    //* Load the changes
    (this.userLogin.name = this.user.name),
      (this.userLogin.surname = this.user.surname),
      (this.userLogin.email = this.user.email),
      (this.userLogin.phone = this.user.phone),
      (this.userLogin.location = this.user.location),
      (this.userLogin.birth_date = this.user.birth_date),
      (this.fullName = `${this.userLogin.name} ${this.userLogin.surname}`);
    //* Updated
    const status = await this.userService.updateUser(this.userLogin);
    if (status) {
      this.modalCtrl.dismiss(this.user);
      this.uiService.presentToast('Usuario Actualizado');
      this.toggleEditMode();
    } else {
      this.uiService.presentToast('No se pudo actualizar');
    }
  }

  async takePhoto() {
    const options = {
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      saveToGallery: true,
      correctOrientation: true,
    };
    const image = await Camera.getPhoto(options);
    if (image) {
      const base64Data = await this.readAsBase64(image);
      const fileName = new Date().getTime() + '.jpeg';

      const imageFile = {
        name: fileName,
        data: base64Data,
      };

      const formData = new FormData();
      const response = await fetch(imageFile.data);
      const blob = await response.blob();
      formData.append('avatar', blob, imageFile.name);

      if (await this.userService.updateAvatar(formData)) {
        this.userService.validateToken();
        this.userLogin = this.userService.getUser();
      }
    }
  }

  async readAsBase64(photo: Photo) {
    if (this.platform.is('hybrid')) {
      const file = await Filesystem.readFile({
        path: photo.path!,
      });

      return file.data;
    } else {
      const response = await fetch(photo.webPath!);
      const blob = await response.blob();
      return (await this.convertBlobToBase64(blob)) as string;
    }
  }

  convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });

  getGeolocation() {
    if (!this.user.position) {
      this.user.location = '';
      this.loadingGeolocation = false;
    }
    this.loadingGeolocation = true;
    const printCurrentPosition = async () => {
      const coordinates = await Geolocation.getCurrentPosition();
      console.log("hola")
      console.log(coordinates.coords);
    };
  }

  toggleEditMode() {
    this.enabledEditMode = !this.enabledEditMode;
  }

  changeNameUpdated(fullName: any) {
    this.fullName = fullName;
  }

  //* function for created array gor created the star
  range(length: number): number[] {
    return Array.from({ length }, (_, index) => index);
  }

  reload(event?: any) {
    if (event) {
      event.target.complete();
    }
  }

  closeModal() {
    this.modalCtrl.dismiss(this.user);
  }

  

}
