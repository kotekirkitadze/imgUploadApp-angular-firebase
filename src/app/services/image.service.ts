import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { GalleryImage } from '../models/galleryImage.model';


@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private uid: string;

  constructor(private afAuth: AngularFireAuth,
    private db: AngularFirestore) {
    this.afAuth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        this.uid = auth.uid;
      }
    })
  }

  getImages(): Observable<GalleryImage[]> {
    return this.db.collection<GalleryImage>('uploads').valueChanges()
  }

  getImage(key: string) {
    return of(null)
  }
}
