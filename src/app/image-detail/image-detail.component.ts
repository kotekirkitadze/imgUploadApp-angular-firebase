import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.scss']
})
export class ImageDetailComponent implements OnInit {
  imgUrl = '';


  constructor(
    private imageService: ImageService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getImageUrl(this.route.snapshot.params['id'])
    console.log(this.route.snapshot.params['id'])
  }

  getImageUrl(key: string) {
    this.imageService.getImage(key).subscribe(
      data => {
        this.imgUrl = data.url;
        console.log(data.url)
      }

    )
  }

}
