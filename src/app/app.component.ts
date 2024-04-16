import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Platform  } from '@ionic/angular'
import { MenuController, ModalController, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, 
  IonIcon, IonLabel, IonRouterOutlet, IonToggle, IonRow, IonGrid, IonCol } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {  home, person, radio, newspaper, cart, exit, logIn } from 'ionicons/icons';
import { UsuarioService } from './services/usuario/usuario.service';
import { CarritoService } from './services/carrito/carrito.service';
//import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { isPlatform } from '@ionic/angular';

import { PAGES } from './config/pages.config';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, 
    IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonToggle, TranslateModule, IonLabel, IonRow, IonGrid, IonCol ],
})
export class AppComponent {

  pages:any = PAGES;

  public appPages = [
    { title: 'Inbox', url: '/folder/inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(
    public platform: Platform,
    public _up:UsuarioService,
    public _cp:CarritoService,
    private menuCtrl:MenuController,
    public translateService:TranslateService,
  ) {
    addIcons({ home, person, radio, newspaper, cart, exit, logIn });

    this._up.cargar_storage().then(() => {
      if(this._up.language != ""){
        this.translateService.use(this._up.language);
      }
    });
    
    platform.ready().then(() => {
      this._up.pagesInit = PAGES;
      this._up.pages = PAGES.filter(page => {
        return page.show === true;
      });
    });

    if(!isPlatform('capacitor')) {      
      GoogleAuth.initialize({
        clientId: '213739652036-mihsbsqs8h3jrdam3ujkk3ufcbt66rrf.apps.googleusercontent.com',
        scopes: ['profile','email'],
        grantOfflineAccess: true,
      });
    }
  }

  profile(){
    //this.app.getRootNav().setRoot(PerfilPage);
    //this.menuCtrl.close();
  }

  signIn(){
    this.menuCtrl.close();
    this._up.valida_login(document.querySelector('ion-page'));
  }

  signOut(){
    /*this._up.cerrar_sesion().then(()=>{
      console.log("Cerró Sesion");
    });
    this._cp.items = [];
    this._cp.asignados = [];
    this._cp.transmisiones = 0;
    this.menuCtrl.close();*/
  }
}
