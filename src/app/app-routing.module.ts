import { UserAuthorizationService, AdministratorAuthorizationService } from './services/authorization.service';
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
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./cadastro/cadastro.module').then(m => m.CadastroPageModule)
  },
  {
    path: 'cadastrar-ong',
    loadChildren: () => import('./cadastrar-ong/cadastrar-ong.module').then(m => m.CadastrarOngPageModule),
    canActivate: [UserAuthorizationService]
  },
  /*
  {
    path: 'listar-ong',
    loadChildren: () => import('./listar-ong/listar-ong.module').then(m => m.ListarOngPageModule)
  },
  */
  {
    path: 'area-colaborador',
    loadChildren: () => import('./area-colaborador/area-colaborador.module').then(m => m.AreaColaboradorPageModule),
    canActivate: [UserAuthorizationService]
  },
  {
    path: 'ong-info/:id',
    loadChildren: () => import('./ong-info/ong-info.module').then(m => m.OngInfoPageModule)
  },
  {
    path: 'cria-animal/:id',
    loadChildren: () => import('./cria-animal/cria-animal.module').then(m => m.CriaAnimalPageModule),
    canActivate: [UserAuthorizationService]
  },
  {
    path: 'atualiza-animal/:id',
    loadChildren: () => import('./atualiza-animal/atualiza-animal.module').then(m => m.AtualizaAnimalPageModule),
    canActivate: [UserAuthorizationService]
  },
  {
    path: 'editar-ong/:id',
    loadChildren: () => import('./editar-ong/editar-ong.module').then(m => m.EditarOngPageModule),
    canActivate: [UserAuthorizationService]
  },
  {
    path: 'listar-usuario',
    loadChildren: () => import('./listar-usuario/listar-usuario.module').then(m => m.ListarUsuarioPageModule),
    canActivate: [AdministratorAuthorizationService]
  },
  {
    path: 'editar-usuario/:id',
    loadChildren: () => import('./editar-usuario/editar-usuario.module').then(m => m.EditarUsuarioPageModule),
    canActivate: [UserAuthorizationService]
  },
  {
    path: 'listar-colaborador',
    loadChildren: () => import('./listar-colaborador/listar-colaborador.module').then(m => m.ListarColaboradorPageModule),
    canActivate: [UserAuthorizationService]
  },
  {
    path: 'editar-colaborador',
    loadChildren: () => import('./editar-colaborador/editar-colaborador.module').then(m => m.EditarColaboradorPageModule),
    canActivate: [UserAuthorizationService]
  },
  {
    path: 'avaliar-ongs',
    loadChildren: () => import('./avaliar-ongs/avaliar-ongs.module').then(m => m.AvaliarOngsPageModule),
    canActivate: [UserAuthorizationService]
  },
  {
    path: 'listar-especie',
    loadChildren: () => import('./listar-especie/listar-especie.module').then(m => m.ListarEspeciePageModule),
    canActivate: [AdministratorAuthorizationService]
  },
  {
    path: 'listar-raca',
    loadChildren: () => import('./listar-raca/listar-raca.module').then(m => m.ListarRacaPageModule),
    canActivate: [AdministratorAuthorizationService]
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilPageModule),
    canActivate: [UserAuthorizationService]
  },
  {
    path: 'ativar/:token',
    loadChildren: () => import('./ativar/ativar.module').then(m => m.AtivarPageModule)
  },
  {
    path: 'esqueceu-senha',
    loadChildren: () => import('./esqueceu-senha/esqueceu-senha.module').then(m => m.EsqueceuSenhaPageModule)
  },
  {
    path: 'redefinir-senha/:token',
    loadChildren: () => import('./redefinir-senha/redefinir-senha.module').then(m => m.RedefinirSenhaPageModule)
  },
  {
    path: 'perfil-usuario',
    loadChildren: () => import('./perfil-usuario/perfil-usuario.module').then(m => m.PerfilUsuarioPageModule),
    canActivate: [UserAuthorizationService]
  },
  {
    path: 'area-colaborador',
    loadChildren: () => import('./area-colaborador/area-colaborador.module').then(m => m.AreaColaboradorPageModule),
    canActivate: [UserAuthorizationService]
  },
  {
    path: 'ong-info/:id',
    loadChildren: () => import('./ong-info/ong-info.module').then(m => m.OngInfoPageModule)
  },
  {
    path: 'cria-animal/:id',
    loadChildren: () => import('./cria-animal/cria-animal.module').then(m => m.CriaAnimalPageModule),
    canActivate: [UserAuthorizationService]
  },
  {
    path: 'atualiza-animal/:id',
    loadChildren: () => import('./atualiza-animal/atualiza-animal.module').then(m => m.AtualizaAnimalPageModule),
    canActivate: [UserAuthorizationService]
  },
  {
    path: 'editar-ong/:id',
    loadChildren: () => import('./editar-ong/editar-ong.module').then(m => m.EditarOngPageModule),
    canActivate: [UserAuthorizationService]
  },
  {
    path: 'listar-usuario',
    loadChildren: () => import('./listar-usuario/listar-usuario.module').then(m => m.ListarUsuarioPageModule),
    canActivate: [AdministratorAuthorizationService]
  },
  {
    path: 'editar-usuario',
    loadChildren: () => import('./editar-usuario/editar-usuario.module').then(m => m.EditarUsuarioPageModule),
    canActivate: [AdministratorAuthorizationService]
  },
  {
    path: 'listar-colaborador',
    loadChildren: () => import('./listar-colaborador/listar-colaborador.module').then(m => m.ListarColaboradorPageModule),
    canActivate: [UserAuthorizationService]
  },
  {
    path: 'editar-colaborador',
    loadChildren: () => import('./editar-colaborador/editar-colaborador.module').then(m => m.EditarColaboradorPageModule),
    canActivate: [UserAuthorizationService]
  },
  {
    path: 'avaliar-ongs',
    loadChildren: () => import('./avaliar-ongs/avaliar-ongs.module').then(m => m.AvaliarOngsPageModule),
    canActivate: [UserAuthorizationService]
  },
  {
    path: 'listar-especie',
    loadChildren: () => import('./listar-especie/listar-especie.module').then(m => m.ListarEspeciePageModule),
    canActivate: [AdministratorAuthorizationService]
  },
  {
    path: 'listar-raca',
    loadChildren: () => import('./listar-raca/listar-raca.module').then(m => m.ListarRacaPageModule),
    canActivate: [AdministratorAuthorizationService]
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilPageModule),
    canActivate: [UserAuthorizationService]
  },
  {
    path: 'ativar/:token',
    loadChildren: () => import('./ativar/ativar.module').then(m => m.AtivarPageModule)
  },
  {
    path: 'esqueceu-senha',
    loadChildren: () => import('./esqueceu-senha/esqueceu-senha.module').then(m => m.EsqueceuSenhaPageModule)
  },
  {
    path: 'redefinir-senha/:token',
    loadChildren: () => import('./redefinir-senha/redefinir-senha.module').then(m => m.RedefinirSenhaPageModule)
  },
  {
    path: 'animal-info/:id',
    loadChildren: () => import('./animal-info/animal-info.module').then(m => m.AnimalInfoPageModule)
  },
  {
    path: 'formulario-adocao/:id',
    loadChildren: () => import('./formulario-adocao/formulario-adocao.module').then(m => m.FormularioAdocaoPageModule),
    canActivate: [UserAuthorizationService]
  },
  {
    path: 'cadastrar-usuario',
    loadChildren: () => import('./cadastrar-usuario/cadastrar-usuario.module').then(m => m.CadastrarUsuarioPageModule),
    canActivate: [AdministratorAuthorizationService]
  },
  {
    path: 'resgate',
    loadChildren: () => import('./resgate/resgate.module').then(m => m.ResgatePageModule),
    canActivate: [UserAuthorizationService]
  },

  {
    path: 'ongs',
    loadChildren: () => import('./ongs/ongs.module').then(m => m.OngsPageModule)
  },
  {
    path: 'visualizar-ong/:id',
    loadChildren: () => import('./visualizar-ong/visualizar-ong.module').then(m => m.VisualizarOngPageModule)
  },
  {
    path: 'listar-ong',
    loadChildren: () => import('./listar-ong/listar-ong.module').then(m => m.ListarOngPageModule),
    canActivate: [AdministratorAuthorizationService]
  },
  {
    path: 'listar-denuncia',
    loadChildren: () => import('./listar-denuncia/listar-denuncia.module').then( m => m.ListarDenunciaPageModule),
    canActivate: [UserAuthorizationService]
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
