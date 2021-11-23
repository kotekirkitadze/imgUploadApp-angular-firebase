import { Component, OnInit } from '@angular/core';
import { Upload } from '../models/upload.model';
import { UploadService } from '../services/upload.service';
import { range, each } from 'lodash';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {

  files: FileList;
  upload: Upload;

  constructor(private uploadService: UploadService) { }

  uploadFiles() {
    const filesToUpload = this.files;
    const filesIdx = range(filesToUpload.length);
    each(filesIdx, (idx) => {
      // console.log(filesToUpload[idx])
      this.upload = new Upload(filesToUpload[idx]);
      this.uploadService.uploadFile(this.upload);
    })
  }

  handleFiles(event) {
    this.files = event.target.files;
  }

}
