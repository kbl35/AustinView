import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { ImageService } from '../../shared/image.service';

@Component({
  selector: 'app-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.css']
})
export class ImageDetailComponent implements OnInit {
  pagetitle = 'Place Detail';
  place: any;
  imageList: any[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: ImageService) { }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getImage(id);
    }
  }

  getImage(id: number) {
    this.service.imageDetailList.snapshotChanges().subscribe(
      list => {
        this.imageList = list.map(item => item.payload.val());
        this.place = this.imageList[id - 1];
      }
    )
  }

}
