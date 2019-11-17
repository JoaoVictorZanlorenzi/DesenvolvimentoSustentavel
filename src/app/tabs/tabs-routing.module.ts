import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [           
      {
        path: 'tab3',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../usuario/editarDadosUsuario/tab3.module').then(m => m.Tab3PageModule)
          }
        ]
      },
      {
        path: 'tab4',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../evento/tab4/tab4.module').then(m => m.Tab4PageModule)
          }
        ]
      }, {
        path: 'tab5',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../usuario/tab5/tab5.module').then(m => m.Tab5PageModule)
          }
        ]
      },
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../evento/home/home.module').then(m => m.HomePageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/paginaInicial/paginaInicial',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/paginaInicial/paginaInicial',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
