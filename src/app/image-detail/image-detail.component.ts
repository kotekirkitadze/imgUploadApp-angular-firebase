import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.scss']
})
export class ImageDetailComponent implements OnInit {
  private imgUrl = '';


  constructor(
    private imageService: ImageService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getImageUrl(this.route.snapshot.params['id'])
  }

  getImageUrl(key: string) {
    this.imageService.getImage(key).subscribe(
      imageUrl => this.getImageUrl = imageUrl
    )
  }

}
