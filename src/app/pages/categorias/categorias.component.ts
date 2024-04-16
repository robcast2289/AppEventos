import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

// Ion-Tags
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem } from '@ionic/angular/standalone';

// Moduls
import { TranslateModule, TranslateService } from '@ngx-translate/core';

// Services, Components, Pipes and Others
import { EventosService } from '../../services/eventos/eventos.service';


@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss'],
  standalone: true,
  imports: [ CommonModule, TranslateModule, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem ]
})
export class CategoriasComponent  implements OnInit {

  constructor(
    public _ep:EventosService,
  ) { }

  ngOnInit() {}

}
