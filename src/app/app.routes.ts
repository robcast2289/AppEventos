import { Routes } from '@angular/router';

export const routes: Routes = [
  /* {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full',
  },
  /* {
    path: 'folder/:id',
    loadComponent: () =>
      import('./folder/folder.page').then((m) => m.FolderPage),
  }, */
  {
    path: '',
    loadChildren: () =>
      import('./pages/tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'evento',
    loadComponent: () =>
    import('./pages/evento/evento.component').then((m) => m.EventoComponent),
  }
];
