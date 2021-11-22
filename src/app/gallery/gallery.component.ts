import { Component, OnChanges, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GalleryImage } from '../models/galleryImage.model';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit, OnChanges {
  images: Observable<GalleryImage[]>

  constructor(private imageService: ImageService) { }

  ngOnInit(): void {
    this.images = this.imageService.getImages();
  }

  ngOnChanges() {
    this.images = this.imageService.getImages();
  }

}
