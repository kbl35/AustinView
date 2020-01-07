import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/shared/image.service';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styles: []
})
export class ImageListComponent implements OnInit {
  pageTitle = 'Sceneries';
  imageList: any[];
  rowIndexArray: any[];

  constructor(private service: ImageService) { }

  ngOnInit() {
    this.service.imageDetailList.snapshotChanges().subscribe(
      list => {
        this.imageList = list.map(item => item.payload.val());
      }
    );
  }

}
