import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';

// Ion-Tags
import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonMenuButton, IonTitle, IonContent, IonIcon, IonBadge, IonButton,
  IonRefresher, IonRefresherContent, IonLabel,  IonItem, IonList, IonItemSliding, IonItemOptions, IonItemOption,
  IonCol, IonRow, IonGrid, IonNavLink, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonicSlides} from '@ionic/angular/standalone';

// Icons
import { addIcons } from 'ionicons';
import { cart, globe, calendarOutline, calendar, card, listCircleOutline, list, time, people } from 'ionicons/icons';

// Moduls
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

// Moduls Externals
import { register } from 'swiper/element/bundle';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'

// Controllers
import { AlertController } from '@ionic/angular';

// Services, Components, Pipes and Others
import { EventosService } from '../../services/eventos/eventos.service';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { CarritoService } from '../../services/carrito/carrito.service';
import { ImagenPipe, ImagenPerfilPipe } from 'src/app/pipes/imagen/imagen.pipe';
import { DetalleLogin } from 'src/app/interfaces/DetalleLogin';


@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.scss'],
  standalone: true,
  imports: [RouterModule, ImagenPipe, ImagenPerfilPipe, TranslateModule, CommonModule, IonHeader, IonToolbar, IonButtons, IonBackButton, 
    IonMenuButton, IonTitle, IonContent, IonIcon, IonBadge, IonButton, IonRefresher, IonRefresherContent, IonLabel, IonItem, IonList, 
    IonItemSliding, IonItemOptions, IonItemOption, IonCol, IonRow, IonGrid, IonNavLink, IonCard, IonCardHeader, IonCardContent, IonCardTitle, 
    IonCardSubtitle],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EventoComponent  implements OnInit {

  /* evento:any; */
  evento:any = {};

  //perfil:any = PerfilPage;
  eventoPersonal?:number;
  iconCart:string = "";

  swiperModules = [IonicSlides];

  constructor(
    public activatedRoute: ActivatedRoute,
    public _ep:EventosService,
    public _up:UsuarioService,
    public _cp:CarritoService,
    private alertCtrl:AlertController,
    public translateService:TranslateService
  ) { 
    addIcons({cart, globe, calendarOutline, calendar, card, listCircleOutline, list, time, people });

    register();
  }

  ngOnInit() {
    /* this.activatedRoute.params.subscribe(params => {
      let eventoPrincipal = JSON.parse(atob(params['evento']));
      this.evento = params;
      console.log(this.evento);
      this._ep.cargar_detalle(this.evento.evento.toString());
    }); */

    this.evento = this._ep.evento_seleccionado;
    this._ep.evento_detalle = {} as DetalleLogin;
    console.log(this.evento);
    this._ep.cargar_detalle(this.evento[<any>"Evento"]);
    console.log(this._ep.evento_detalle);
  }

  addCart(event:any){}

}
