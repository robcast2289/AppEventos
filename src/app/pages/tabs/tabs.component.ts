import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { CommonModule } from '@angular/common';

import { IonTabs, IonTabBar, IonTabButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { home, star, newspaper } from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  standalone: true,
  imports: [CommonModule, TranslateModule, IonTabs, IonTabBar, IonTabButton, IonIcon]
})
export class TabsComponent  implements OnInit {

  constructor() { 
    addIcons({home, star, newspaper});
  }

  ngOnInit() {}

}
