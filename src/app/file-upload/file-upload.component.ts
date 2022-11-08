import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ForecastService } from '../forecast.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  
  csvFile : any; 

  @ViewChild("fileSelect") myInputVariable?: ElementRef

  constructor(private forecast : ForecastService,private route : Router) { }

  filename = ""

  noOfYears = 0

  uploadStatus = "No file chosen"

  fileUpload(event : any) {
    console.log(event.target.files);
    var file = event.target.files[0];
    var filename = file.name;
    var fileExt = filename.split('.');
    if(fileExt[1] === 'csv') {
      this.csvFile = file;
      this.filename = filename;
      this.uploadStatus = "Chosen file"
      console.log(this.csvFile);
    }
  }

  onSubmit() {
    console.log(this.csvFile);
    localStorage.setItem("csvFile", JSON.stringify(this.csvFile));
     this.forecast.uploadcsv(this.csvFile , this.noOfYears).subscribe({next: 
        (res) => {
          console.log(res);
          
          localStorage.setItem("analysisdata" , JSON.stringify(res.status));

          this.route.navigate(["analysis"]);
        },
        error : (error) => {
          console.log(error);
        }
      
      })
    }

  ngOnInit(): void {
  }

}
