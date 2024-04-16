import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Credenciales } from "../../interfaces/credenciales.interface";
import { url_services, url_services_proxy } from "../../config/url.services";
import { TranslateService } from '@ngx-translate/core';
import { ModalController } from '@ionic/angular/standalone';
import { Storage } from '@ionic/storage';
import { isPlatform } from '@ionic/angular';
import { NavController } from '@ionic/angular/standalone'

import { Perfil } from "../../config/perfil.config";
import { LoginComponent } from 'src/app/pages/login/login.component';
import { Observable, catchError, map, of } from 'rxjs';
import { Login } from 'src/app/interfaces/Login';
import { RegistroComponent } from 'src/app/pages/registro/registro.component';
import { TabsComponent } from 'src/app/pages/tabs/tabs.component';

import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  pages: any[] = [];
  pagesInit: any[] = [];
  credenciales: Credenciales = {};
  perfil = Perfil;
  logueado: boolean = false;
  carneVirtualQR: string = "";

  perfilEstudiante: any[] = [];
  perfilDocente: any[] = [];
  perfilAdministrativo: any[] = [];

  paises: any[] = [];
  paisescentroamerica: any[] = [];

  mensajeError = "";

  networking = {
    telefono: true,
    email: true,
    trabajo: true
  };

  language = "";

  //basepath = url_services_proxy;
  basepath = url_services;

  constructor(
    private storage:Storage,
    public http: HttpClient, 
    public translateService:TranslateService,
    private modalCtrl:ModalController,
    private navCtrl:NavController
  ) { }

  async translateSer(value:any, parm?:any) {
    let valueTranslate = "";
    await this.translateService
      .get(value, parm)
      .toPromise()
      .then(resp => {
        valueTranslate = resp;
      });
    return valueTranslate;
  }

  async valida_login(presentingElement:any) {
    console.log('valida login');
    if(this.logueado){
      this.navCtrl.navigateRoot('tabs');
      console.log('logueado');
    } else {
      let modal: any;
      modal = await this.modalCtrl.create({
        component: LoginComponent,
        presentingElement: presentingElement,
      });
      modal.onDidDismiss(async (retorno: boolean) => {
        console.log("Cerro");
        console.log(this.logueado);
        console.log(retorno);
        if(!this.logueado && retorno) {
          let modalReg: any;
          modalReg = await this.modalCtrl.create({
            component: RegistroComponent,
          });
          await modalReg.present();
        }
        if(this.logueado) {
          this.navCtrl.navigateRoot('tabs');
        }
      });
      await modal.present();
    }
    
  }

  cerrar_sesion() {
    return GoogleAuth.signOut()
    .catch((val)=>{
      console.log(val);
    })
    .then(res => {
      console.log('llego limpiar');
      this.credenciales = {};
      this.limpia_perfil();
      this.guardar_storage();
      this.logueado = false;
    });
  }

  limpia_perfil() {
    this.perfil.email = "";
    this.perfil.nombres = "";
    this.perfil.apellidos = "";
    this.perfil.telefono = "";
    this.perfil.nacionalidad = "";
    this.perfil.dpi = "";
    this.perfil.pasaporte = "";
    this.perfil.fechanac = "";
    this.perfil.pas_pais = "";
    this.perfil.lugagr_trabajo = "";
    this.perfil.puesto = "";
    this.perfil.telefono_trabajo = "";
    this.perfil.compartir = "";
    this.perfil.cambiardocumento = "";
    this.perfil.dpi_pais = "";
    this.perfil.id_galileo = "";
    this.perfil.es_menor = false;
  }

  info_token(token: string) {
    let url = "";
    url = `https://oauth2.googleapis.com/tokeninfo?access_token=${ token }`;

    return this.http.get(url)
      .pipe(
        map(resp => resp),
        catchError(() => {
          return of();
        })
      )
  }

  loginEventos() {
    //let params = new URLSearchParams();
    //let params = new HttpParams();

    //params.append("TOKEN", this.credenciales.accessToken??'');
    //params.append("TIPO", this.credenciales.providerId??'');

    let url = `${this.basepath}login`;
    url = url + `?TOKEN=${this.credenciales.accessToken}&TIPO=${this.credenciales.providerId}`;

    let promesa = new Promise((resolve, reject) => {
      this.http.post(url,{})
        .pipe(
          map(res => {
            let perfil: Login;
            perfil = JSON.parse(JSON.stringify(res)) as Login;
            return perfil;
          }),
          catchError(error => {
            return of([{Perfil: null}]);
          })
        )
        .subscribe(data => {
          resolve(data);
        })
    });

    return promesa;
  }

  cargar_credenciales(
    nombre: string,
    email: string,
    photoURL: string,
    uid: string,
    providerId: string,
    accessToken: string,
    expiresIn: number,
    userId: string
  ) {
    this.credenciales.nombre = nombre;
    this.credenciales.email = email;
    this.credenciales.photoURL = photoURL;
    this.credenciales.uid = uid;
    this.credenciales.providerId = providerId;
    this.credenciales.accessToken = accessToken;
    this.credenciales.expiresIn = expiresIn;
    this.credenciales.userId = userId;
  }

  cargar_parfil(
    email: string,
    nombres: string,
    apellidos: string,
    telefono: string,
    nacionalidad: string,
    dpi: string,
    pasaporte: string,
    fechanac: string,
    pas_pais: string,
    lugagr_trabajo: string,
    puesto: string,
    telefono_trabajo: string,
    compartir: string,
    cambiardocumento: string,
    dpi_pais: string,
    id_galileo: string,
    es_menor: boolean
  ) {
    this.logueado = true;
    this.perfil.email = email;
    this.perfil.nombres = nombres;
    this.perfil.apellidos = apellidos;
    this.perfil.telefono = telefono;
    this.perfil.nacionalidad = nacionalidad;
    this.perfil.dpi = dpi;
    this.perfil.pasaporte = pasaporte;
    this.perfil.fechanac = fechanac;
    this.perfil.pas_pais = pas_pais;
    this.perfil.lugagr_trabajo = lugagr_trabajo;
    this.perfil.puesto = puesto;
    this.perfil.telefono_trabajo = telefono_trabajo;
    this.perfil.compartir = compartir;
    this.perfil.cambiardocumento = cambiardocumento;
    this.perfil.dpi_pais = dpi_pais;
    this.perfil.id_galileo = id_galileo;
    this.perfil.es_menor = es_menor;
  }

  public guardar_storage() {
    if (isPlatform('capacitor')) {
      // Dispositivo movil
      this.storage.set("credenciales", this.credenciales);
      this.storage.set("perfil", this.perfil);
      this.storage.set("networking", this.networking);
      this.storage.set("lang", this.language);
    } else {
      console.log(this.perfil.email)
      // Computadora de escritorio
      if (this.perfil.email) {
        localStorage.setItem("nombre", this.credenciales.nombre!);
        localStorage.setItem("email", this.credenciales.email!);
        localStorage.setItem("photoURL", this.credenciales.photoURL!);
        localStorage.setItem("uid", this.credenciales.uid!);
        localStorage.setItem("providerId", this.credenciales.providerId!);
        localStorage.setItem("accessToken", this.credenciales.accessToken!);
        localStorage.setItem(
          "expiresIn",
          this.credenciales.expiresIn!.toString()
        );
        localStorage.setItem("userId", this.credenciales.userId!);
        localStorage.setItem("networking", JSON.stringify(this.networking));
      } else {
        localStorage.removeItem("nombre");
        localStorage.removeItem("email");
        localStorage.removeItem("photoURL");
        localStorage.removeItem("uid");
        localStorage.removeItem("providerId");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("expiresIn");
        localStorage.removeItem("userId");
        localStorage.removeItem("networking");
      }
      localStorage.setItem("lang", JSON.stringify(this.language));
    }
  }

  cargar_storage() {
    let promesa = new Promise((resolve, reject) => {
      if (isPlatform('capacitor')) {
        // Dispositivo movil
        //this.storage.ready().then(() => {
          this.storage.get("credenciales").then(credencial => {
            if (credencial) {
              this.credenciales = credencial;
            }
          });
          this.storage.get("networking").then(network => {
            if (network) {
              this.networking = network;
            }
          });
          this.storage.get("lang").then(lang => {
            if (lang) {
              this.language = lang;
            }
          });
          this.storage.get("perfil").then(perfil => {
            if (perfil) {
              this.perfil = perfil;
            }
            
          });
          resolve(0);
        //});
      } else {
        // Computadora     
        if (localStorage.getItem("nombre"))
          this.credenciales.nombre = localStorage.getItem("nombre")!;
        if (localStorage.getItem("email"))
          this.credenciales.email = localStorage.getItem("email")!;
        if (localStorage.getItem("photoURL"))
          this.credenciales.photoURL = localStorage.getItem("photoURL")!;
        if (localStorage.getItem("uid"))
          this.credenciales.uid = localStorage.getItem("uid")!;
        if (localStorage.getItem("providerId"))
          this.credenciales.providerId = localStorage.getItem("providerId")!;
        if (localStorage.getItem("accessToken"))
          this.credenciales.accessToken = localStorage.getItem("accessToken")!;
        if (localStorage.getItem("expiresIn"))
          this.credenciales.expiresIn = Number(
            localStorage.getItem("expiresIn")
          );
        if (localStorage.getItem("userId"))
          this.credenciales.userId = localStorage.getItem("userId")!;
        if (localStorage.getItem("networking"))
          this.networking = JSON.parse(localStorage.getItem("networking")!);
        if (localStorage.getItem("lang"))
          this.language = JSON.parse(localStorage.getItem("lang")!);

        resolve(0);
      }
    });
    return promesa;
  }
}