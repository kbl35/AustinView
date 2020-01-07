import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';

import { finalize } from 'rxjs/operators';
import { ImageService } from 'src/app/shared/image.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styles: []
})
export class ImageComponent implements OnInit {

  imgSrc: string;
  selectedImage: any = null;
  isSubmitted: boolean;
  imageList: any[];
  index: number;

  formTemplate = new FormGroup({
    placeId: new FormControl('', Validators.required),
    placeName: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    placeDescription: new FormControl('', Validators.required),
    Address: new FormControl('', Validators.required),
    imageUrl: new FormControl('', Validators.required)
  });


  constructor(private storage: AngularFireStorage,
              private service: ImageService) { }

  ngOnInit() {
    this.resetForm();
  }

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.imgSrc = '/assets/img/imagePlaceHolder.png';
      this.selectedImage = null;
    }
  }

  onSubmit(formValue) {
      this.isSubmitted = true;
      if (this.formTemplate.valid) {
        var filePath = `Images/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime}`;
        const fileRef = this.storage.ref(filePath);
        this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(( url) => {
              formValue.imageUrl = url;
              this.service.insertImageDetails(formValue);
              this.resetForm();
            });
          })
        ).subscribe();
      }
  }

  get formControls() {
    return this.formTemplate.controls; // some thing here. tuitorial syntax: formTemplate['controls'];
  }



  resetForm() {
    this.service.imageDetailList.snapshotChanges().subscribe(
      list => {
        this.imageList = list.map(item => item.payload.val());
        this.index = this.imageList.length + 1;
        this.formTemplate.reset();
        this.formTemplate.setValue({
        placeId: this.index,
        placeName: null,
        city: null,
       placeDescription: null,
        Address: null,
        imageUrl: null
    });
        this.imgSrc = '/assets/img/imagePlaceHolder.png';
        this.selectedImage = null;
        this.isSubmitted = false;
      }

    );

  }

}
