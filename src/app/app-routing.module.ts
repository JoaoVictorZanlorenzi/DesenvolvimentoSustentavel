import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  //Página inicial default
  {
    path: '',
    redirectTo: 'paginaInicial',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'paginaInicial',
    loadChildren: () => import('./paginaInicial/paginaInicial').then(m => m.paginaInicialPageModule)
  },
  

  //Páginas de usuário
  { path: 'usuario/login',
    loadChildren: () => import('./usuario/login/login.module').then(m => m.loginModule)
  },
  { path: 'usuario/cadastro',
  loadChildren: () => import('./usuario/cadastro/cadastro.module').then(m => m.cadastroPageModule)
  },



  //Páginas de evento
  { path: 'evento/home',
  loadChildren: () => import('./evento/home/home.module').then(m => m.HomePageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
