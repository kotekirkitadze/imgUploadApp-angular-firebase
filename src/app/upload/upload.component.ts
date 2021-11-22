import { Component, OnInit } from '@angular/core';
import { Upload } from '../models/upload.model';
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  files: FileList;
  upload: Upload;

  constructor(private uploadService: UploadService) { }

  ngOnInit(): void {
  }

}
