import { Injectable } from '@angular/core';
import { Upload } from '../models/upload.model';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { GalleryImage } from '../models/galleryImage.model';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule, BUCKET } from '@angular/fire/compat/storage';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { combineLatest, concat, forkJoin, from, merge, Observable, of } from 'rxjs';
import { finalize, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { url } from 'inspector';
import { map } from '@firebase/util';
import { AuthService } from './auth.service';
import { ImageService } from './image.service';


@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private uid: string;
  private numImages: number;

  uploadPercent: Observable<number>;
  private basePath = '/uploads';
  private uploads: AngularFirestoreCollection<GalleryImage[]>;

  constructor(
    private ngFire: AngularFireModule,
    private db: AngularFireStorage,
    private coll: AngularFirestore,
    private authService: AuthService,
    private imageService: ImageService) { }
  downloadURL: Observable<string>;
  uploadFile(upload: Upload) {
    const filePath = `${this.basePath}/${upload.file.name}`;
    const fileRef = this.db.ref(filePath)
    const task = this.db.upload(filePath, upload.file);

    this.authService.getAuthUser().subscribe(
      user => {
        this.uid = user.uid;
      }
    )

    this.imageService.getImages().subscribe(
      img => this.numImages = img.length
    )

    task.percentageChanges().pipe(
      switchMap(progress => {
        upload.progress = progress;
        if (progress == 100) {
          console.log()
          upload.$key =
            this.uid.substring(0, 5) + ++this.numImages;
          upload.name = upload.file.name
          return fileRef.getDownloadURL()
        }
        return of(null)
      })
    ).subscribe((url) => {
      if (upload.progress == 100) {
        upload.url = url;
        this.saveFileData(upload)
      }
    })
  }


  saveFileData(upload: Upload) {
    const collData = {
      url: upload.url,
      name: upload.name,
      createdOn: upload.createdOn,
      $key: upload.$key
    }
    this.coll.collection<any>(`${this.basePath}/`).add(collData);
  }
}
