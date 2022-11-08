import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent implements OnInit {
  
  public csvdata : any[] = [];

  imagename = "";

  options = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true,
    headers: ['date','sales','forecast'],
    showTitle: false,
    title: '',
    useBom: false,
    removeNewLines: true,
    keys: ['date','sales','forecast' ],
    filename : "result"
  };

  buttonToggler = new FormControl('graph');

  copyToclipboard() {
    navigator.clipboard.writeText(this.imagename);
    alert("copied");
  }

  constructor() { 
    var getData = JSON.parse(localStorage.getItem("analysisdata") || '{}');
    
    this.imagename = getData.data.predictedimage;

    console.log(this.imagename)

    getData.data.resCsv.forEach((ele : any[]) => {
      if(ele[0] !== 'date'){ 
        var newData = {
          date : ele[0],
          sales : ele[1],
          forecast : ele[2],
        }
        this.csvdata.push(newData);
      }
    });

    console.log(this.csvdata);
  }

  ngOnInit(): void {


  }

}
