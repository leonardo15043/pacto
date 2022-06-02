import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pacto';
  private formBuilder: FormBuilder = new FormBuilder;
  public nameForm!: FormGroup;
  public colorName:any;
  public colors = ["#F59B20","#2A3884","#EA2025","#35A84A","#8F3292"];
  public listColors:any = [];
  public count = 0;
  @ViewChild('screen') screen!: ElementRef;
  @ViewChild('canvas') canvas!: ElementRef;
  @ViewChild('downloadLink') downloadLink!: ElementRef;

  constructor(){
    this.setupForm();
  }

  private setupForm(){
    this.nameForm = this.formBuilder.group({
      name:['',[ Validators.required, Validators.pattern(/^[a-zA-Z0-9\sáéíóúñÁÉÍÓÚ.\-\&\/]+$/)]]
    });
  }

  changeText(){
    this.colorName = this.nameForm.get('name')?.value;
    this.colorName = this.colorName.split("");
    if(this.count >= 4){
      this.count = 0;
    } else {
      this.count ++;
    }
    this.listColors.push(this.colors[this.count]);
  }

  color( index:number ){
    return this.listColors[index];
  }

  download(){
    html2canvas(this.screen.nativeElement).then(canvas => {
      this.canvas.nativeElement.src = canvas.toDataURL();
      this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
      this.downloadLink.nativeElement.download = 'pactosabroso.png';
      this.downloadLink.nativeElement.click();
    });
  }

}
