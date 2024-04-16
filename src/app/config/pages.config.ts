import { TabsComponent } from '../pages/tabs/tabs.component';
import { PerfilComponent } from '../pages/perfil/perfil.component';
import { AsignadosComponent } from '../pages/asignados/asignados.component';
import { CarritoComponent } from '../pages/carrito/carrito.component';
import { GafeteComponent } from '../pages/gafete/gafete.component';
import { NetworkingComponent } from '../pages/networking/networking.component';
import { TabsAsistenciaComponent } from '../pages/tabs-asistencia/tabs-asistencia.component';
// import { HistorialPage } from '../pages/historial/historial';
export const PAGES = [
    { icon: 'home', image: '', title: 'HOME', component: TabsComponent, show: true },
    { icon: 'person', image: '', title: 'PROFILE', component: PerfilComponent, show: true },
    { icon: 'newspaper', image: '', title: 'ASSIGNED', component: AsignadosComponent, show: true },
    { icon: 'cart', image: '', title: 'CART', component: CarritoComponent, show: true },
    // { icon: 'timer', image: '', title: 'Historial de pagos', component: HistorialPage, show: false },
    { icon: '', image: 'gafete.png', title: 'VIRTUAL_BADGE', component: GafeteComponent, show: false },
    { icon: '', image: 'lector3.png', title: 'Registro de asistencia', component: TabsAsistenciaComponent, show: false },
    { icon: '', image: 'networking.png', title: 'NETWORKING', component: NetworkingComponent, show: true }
  ];
