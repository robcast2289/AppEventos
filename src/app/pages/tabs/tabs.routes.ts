import { Routes } from '@angular/router';
import { TabsComponent} from './tabs.component';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsComponent,
    children: [
      {
        path: 'tabTodos',
        loadComponent: () => import('../home/home.component').then(m => m.HomeComponent)
      },
      {
        path: 'tabCategorias',
        loadComponent: () => import('../categorias/categorias.component').then(m => m.CategoriasComponent)
      },
      {
        path: 'tabLivestream',
        loadComponent: () => import('../livestream/livestream.component').then(m => m.LivestreamComponent)
      },
      {
        path: 'tabAsignados',
        loadComponent: () => import('../asignados/asignados.component').then(m => m.AsignadosComponent)
      },
      {
        path: '',
        redirectTo: '/tabs/tabTodos/eventos',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tabTodos',
    pathMatch: 'full'
  }
];