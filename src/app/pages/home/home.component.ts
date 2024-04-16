import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';

// Ion-Tags
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonIcon, IonBadge, IonButton,
  IonRefresher, IonRefresherContent, IonLabel,  IonItem, IonList, IonItemSliding, IonItemOptions, IonItemOption,
  IonCol, IonRow, IonGrid, IonNavLink } from '@ionic/angular/standalone';

// Icons
import { addIcons } from 'ionicons';
import { cart, globe, calendarOutline, calendar, card } from 'ionicons/icons';

// Moduls
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

// Controllers
import { AlertController, LoadingController } from '@ionic/angular';

// Services, Components, Pipes and Others
import { EventosService } from '../../services/eventos/eventos.service';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { CarritoService } from '../../services/carrito/carrito.service';
import { ImagenPipe } from 'src/app/pipes/imagen/imagen.pipe';
import { EventoComponent } from '../evento/evento.component';
import { Login } from 'src/app/interfaces/Login';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [RouterModule, ImagenPipe, TranslateModule, CommonModule, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonIcon, 
    IonBadge, IonButton, IonRefresher, IonRefresherContent, IonLabel, IonItem, IonList, IonItemSliding, IonItemOptions, IonItemOption,
    IonCol, IonRow, IonGrid, IonNavLink],
})
export class HomeComponent  implements OnInit {
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);

  loading:any;

  //evento:any = EventoPage;
  //perfil:any = PerfilPage;
  eventoBuscar:any[] = [];
  myImput:string = '';

  component = EventoComponent;

  constructor(
    public _ep:EventosService,
    public _up:UsuarioService,
    public _cp:CarritoService,
    private alertCtrl:AlertController,
    public translateService:TranslateService,
    private loadingCtrl:LoadingController
  ) { 
    addIcons({cart, globe, calendarOutline, calendar, card});
  }

  async getTextLoading() {
    return await this._cp.translateSer("LOADING_DATA");
  }

  async showLoader(msg:string){
    this.loading = await this.loadingCtrl.create({
      spinner: "circles",
      message: msg
    });
    this.loading.present();
  }

  ngOnInit() {
    this.getTextLoading().then(value => {
      this.showLoader(value);
    });


    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;

    /*console.log(this._up.credenciales.expiresIn!);
    console.log(new Date(1706808239836));*/
    console.log(new Date(this._up.credenciales.expiresIn!));
    console.log(new Date());
    console.log("logueado");
    console.log(this._up.logueado);
    if(this._up.logueado){
      if(new Date(this._up.credenciales.expiresIn!) > new Date()){   // Si el login es válido aún
        this.cargar_eventos().then(()=>{
          this.loading.dismiss();
        });
      }/*else{  // Si no es valido, cierra sesion
        this._up.valida_token().then(() => {
          this.cargar_eventos().then(()=>{
            this.loading.dismiss();
          });
        });
      }*/
    } else {
      this._cp.items = [];
      //this._cp.asignados = [];      
      if(this._up.credenciales.accessToken){
        if(new Date(this._up.credenciales.expiresIn!) > new Date()) {
          this._up.loginEventos()
          .then(data => {
            console.log(data);
            let perfil = data as Login;
            if(perfil.Perfil != null){
              let dat = perfil.Perfil[0];
              if(dat){
                this._up.cargar_parfil(
                  dat.Email,
                  dat.Nombres,
                  dat.Apellidos,
                  dat.Telefono,
                  dat.Nacionalidad,
                  dat.Dpi,
                  dat.Pasaporte,
                  new Date(dat.Fechanac).toDateString(),
                  dat.Pas_Pais,
                  dat.Lugar_Trabajo,
                  dat.Puesto,
                  dat.Telefono_Trabajo,
                  dat.Compartir,
                  dat.Cambiardocumento,
                  dat.Dpi_Pais,
                  dat.Id_Galileo,
                  dat.EsMenor
                );
                console.log("logueado");
                console.log(this._up.logueado);
                //this._ep.cargar_actividades_asistencia();
              }
            }
            this.cargar_eventos().then(() => {
              this.loading.dismiss();
            });
          })
        } else {
          console.log('token expirado');
          this._up.cerrar_sesion()
            .then(()=>{
              console.log('llego  a cerrar sesión');
              this.cargar_eventos()
              .then(()=>{
                this.loading.dismiss();
              });
            });
        }
      }
    }
    
  }

  cargar_eventos(val?:any){
    let promesa = new Promise((resolve,reject)=>{
      this._ep.cargar_eventos().subscribe(data=>{
        this._ep.eventos = data.Eventos
        this._ep.categorias = data.Categorias;
        console.log(this._ep.eventos);
        console.log(data);
        /* if(this._up.logueado){
          this._cp.cargar_carrito();
          this._cp.cargar_asignados();
        } */

        if (val && val.trim() != '') {
          this.eventoBuscar = this._ep.buscar_evento(val)
        }else{
          this.eventoBuscar = this._ep.eventos;
        } 
        resolve(0);
      });
    })
    return promesa;
  }

  /* refresacarEventos(refresher:Refresher){
    this.myImput = "";
    this.cargar_eventos().then(()=>{
      refresher.complete();
    })
  } */

  getLink(evento:any): string {
    //console.log(evento);
    return `/evento/state=${btoa(JSON.stringify(evento))}`;
  }

  setEventSelected(evento:any): string {
    //console.log(evento);
    this._ep.evento_seleccionado = evento;
    return `/evento`;
  }

  handleRefresh(event:any) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  }

  async showRadioLang() {
    let alert = this.alertCtrl.create({
      header: await this._up.translateSer("LANGUAGE"),
      message: await this._up.translateSer("SELECT_LANG"),
      inputs: [
        {
          type: 'radio',
          label: 'Español',
          value: 'es',
          checked: (this._up.language == 'es' ? true : false)
        }, {
          type: 'radio',
          label: 'English',
          value: 'en',
          checked: (this._up.language == 'en' ? true : false)
        },
      ],
      buttons: [
        {
          text: await this._up.translateSer("CANCEL"),
          role: 'buttom',
          cssClass: 'secondary',
        }, {
          text: await this._up.translateSer("OK"),
          role: 'buttom',
          handler: (data) => {
            this.translateService.use(data);
            console.log('Confirm Okay');
          }
        }
      ]
    });

    (await alert).present();
   
  }

}
