import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  /*
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  */
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./cadastro/cadastro.module').then( m => m.CadastroPageModule)
  },
  {
    path: 'cadastrar-ong',
    loadChildren: () => import('./cadastrar-ong/cadastrar-ong.module').then( m => m.CadastrarOngPageModule)
  },
  {
    path: 'listar-ong',
    loadChildren: () => import('./listar-ong/listar-ong.module').then( m => m.ListarOngPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'area-colaborador',
    loadChildren: () => import('./area-colaborador/area-colaborador.module').then( m => m.AreaColaboradorPageModule)
  },
  {
    path: 'ong-info/:id',
    loadChildren: () => import('./ong-info/ong-info.module').then( m => m.OngInfoPageModule)
  },
  {
    path: 'cria-animal/:id',
    loadChildren: () => import('./cria-animal/cria-animal.module').then( m => m.CriaAnimalPageModule)
  },
  {
    path: 'atualiza-animal/:id',
    loadChildren: () => import('./atualiza-animal/atualiza-animal.module').then( m => m.AtualizaAnimalPageModule)
  },
  {
    path: 'editar-ong/:id',
    loadChildren: () => import('./editar-ong/editar-ong.module').then( m => m.EditarOngPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
