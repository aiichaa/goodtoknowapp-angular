import { Response } from '@angular/http';
import { GTKService } from './services/gtk.service';
import GTK from './models/gtk.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private gtkService: GTKService
  ) { }

  public newGTK: GTK = new GTK()

  gtksList: GTK[];
  editGTKs: GTK[] = [];

  ngOnInit(): void {
    this.gtkService.getGTKs()
      .subscribe(gtks => {
        this.gtksList = gtks
        console.log(gtks)
      })
  }


  create() {
    this.gtkService.createGTK(this.newGTK)
      .subscribe((res) => {
        this.gtksList.push(res.data)
        this.newGTK = new GTK()
      })
  }

  editGTK(gtk: GTK) {
    console.log(gtk)
    if(this.gtksList.includes(gtk)){
      if(!this.editGTKs.includes(gtk)){
        this.editGTKs.push(gtk)
      }else{
        this.editGTKs.splice(this.editGTKs.indexOf(gtk), 1)
        this.gtkService.editGTK(gtk).subscribe(res => {
          console.log('Update Succesful')
        }, err => {
          this.editGTK(gtk)
          console.error('Update Unsuccesful')
        })
      }
    }
  }

  submitGTK(event, gtk:GTK){
    if(event.keyCode ==13){
      this.editGTK(gtk)
    }
  }

  deleteGTK(gtk: GTK) {
    this.gtkService.deleteGTK(gtk._id).subscribe(res => {
      this.gtksList.splice(this.gtksList.indexOf(gtk), 1);
    })
  }


  title = 'app';


}
