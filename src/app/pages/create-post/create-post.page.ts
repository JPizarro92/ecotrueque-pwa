import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Category, LocalFile, Post } from '../../interfaces/index';
import { CategoriesService } from '../../services/categories.service';
import { PostsService } from '../../services/posts.service';

import {Camera, CameraResultType, CameraSource, Photo} from '@capacitor/camera'
import {Directory, FileInfo, Filesystem} from '@capacitor/filesystem'
import { LoadingController, ModalController, Platform } from '@ionic/angular';

const IMAGE_DIR = 'stored-images'

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.page.html',
  styleUrls: ['./create-post.page.scss'],
})
export class CreatePostPage implements OnInit {

  images: LocalFile[] = []
  categories: Category[] = []
  
  selectedCategoryID: number = 0
  selectedStatus: string = ''

  post: Post = {
    title: '',
    short_description: '',
    long_description: '',
    exchange_rate: '',
    tags: '',
    product_status: "nuevo",
    post_status: true
  }

  constructor(private categoriesService: CategoriesService,
              private postsService: PostsService,
              private modalCtrl: ModalController,
              private route: Router,
              private platform: Platform,
              private loadingCtrl: LoadingController) { }

  async ngOnInit() {
    const validar = await this.categoriesService.readCategories()
    if(validar){
      this.categories = this.categoriesService.getCategories()
    }
    this.loadFiles();
  }

  selectCategory(){
    this.post.category_id = this.selectedCategoryID
    for(let i = 0; i < this.categories.length; i++){
      if(this.categories[i].id === this.selectedCategoryID){
        this.post.category = this.categories[i]
        break
      }
    }
    
  }

  selectStatus(){
    this.post.product_status = this.selectedStatus
  }

  async createPost(){
    if( this.selectedCategoryID == 0 || this.selectedStatus == ''){
      return
    }
    await this.deleteAllImages();
    if (await this.sendAllImages()){
      if(await this.postsService.createdPosts(this.post)){  
        this.post = {}
        this.closeModal();
        this.route.navigateByUrl('/ecotrueque/my-posts');
      }else{
        //! implementar metodo para eliminar las imagenes en temp o tener un validador de que existen imagenes cargadas ahi
      }
      
    }
  }

  reload(event?:any){
    if(event){
      event.target.complete()
    }
  }
  

  async sendAllImages(){
    const formData = new FormData();
    for(const image of this.images){
      const response = await fetch(image.data);
      const blob = await response.blob();
      formData.append('images', blob, image.name)  
    }
    return this.postsService.uploadImages(formData);
  }

  async deleteAllImages() {
    for (const file of this.images) {
      await Filesystem.deleteFile({
        directory: Directory.Data,
        path: file.path
      });
    }
  }
  

  async deleteImage(file: LocalFile){
    await Filesystem.deleteFile({
      directory: Directory.Data,
      path: file.path
    });
    //this.loadFiles();
  }

  

  galleryFunction = async () => {
    const options = {
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos,
      saveToGallery: true,
      correctOrientation: true
    }
    this.processImage(options)
  };

  cameraFunction = async()=>{
    const options = {
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      saveToGallery: true,
      correctOrientation: true
    };
    this.processImage(options);
  };

  async processImage(options:any){
    const image = await Camera.getPhoto(options);
    if(image){
      this.saveImage(image);
    }
  }

  async saveImage(photo: Photo){
    const base64Data = await this.readAsBase64(photo);
    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      directory: Directory.Data,
      path: `${IMAGE_DIR}/${fileName}`,
      data: base64Data
    })
    
    const filePath = `${IMAGE_DIR}/${fileName}`;
      const readFile = await Filesystem.readFile({
        directory: Directory.Data,
        path: filePath,
      });
      this.images.push({
        name: fileName,
        path: filePath,
        data: `data:image/jpeg;base64,${readFile.data}`
      });
    
    //this.loadFiles();
  }
 
  //* This function load the images from disc to app
  async loadFiles(){
    const loading = await this.loadingCtrl.create({
      message: 'Cargando Imagen...'
    });
    await loading.present()
    Filesystem.readdir({
      directory: Directory.Data,
      path: IMAGE_DIR
    }).then(result =>{
      this.loadFileData(result.files);
    }, async err =>{
      await Filesystem.mkdir({
        directory: Directory.Data,
        path: IMAGE_DIR
      });
    }).then(_ =>{
      loading.dismiss();
    })

  }


  async loadFileData(fileNames: FileInfo[]){
    this.images = []
    for(let f of fileNames){
      const filePath = `${IMAGE_DIR}/${f.name}`;
      const readFile = await Filesystem.readFile({
        directory: Directory.Data,
        path: filePath,
      });
      this.images.push({
        name: f.name,
        path: filePath,
        data: `data:image/jpeg;base64,${readFile.data}`
      });
    }
  }


  async readAsBase64(photo: Photo) {
    if (this.platform.is('hybrid')) {
      const file = await Filesystem.readFile({
        path: photo.path!
      });
  
      return file.data;
    }
    else {
      const response = await fetch(photo.webPath!);
      const blob = await response.blob();  
      return await this.convertBlobToBase64(blob) as string;
    }
  }

  convertBlobToBase64 = (blob: Blob) => new Promise( (resolve, reject) =>{
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result)
    };
    reader.readAsDataURL(blob);
  })
  async closeModal() {
    await this.deleteAllImages();
    this.modalCtrl.dismiss();
  }
  
}
