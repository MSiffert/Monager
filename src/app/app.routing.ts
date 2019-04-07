import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthenticationService } from './services/authentication.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'authenticate',
    loadChildren: './components/auth/auth.module#AuthModule',
  },
  {
    path: 'home',
    loadChildren: './components/home/home.module#HomePageModule',
    canActivate: [AuthenticationService]
  },
  {
    path: 'list',
    loadChildren: './components/list/list.module#ListPageModule',
    canActivate: [AuthenticationService]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
