import { Component, OnInit } from '@angular/core';
import { Inconforme } from '../model/inconforme';

@Component({
  selector: 'app-inconforme',
  templateUrl: './../view/incoforme.component.html',
  styleUrls: [
    './../view/incoforme.component.css',
    './../../global/view/estilo-global-crud.css',
    './../../global/view/icones.css'
  ]
})
export class InconformeComponent implements OnInit {

  constructor() { }

  private inconforme:Inconforme= new Inconforme();

  ngOnInit() {
  }

}
