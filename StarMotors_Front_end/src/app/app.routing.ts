import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { RolesGuard } from './guards/roles.guard';
import { LoginComponent } from './login/login/login.component';


const routes: Routes =[

  //direccion que renderiza primero 
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  }, {
    // todos los componentes del dashboard
    path: '',
    component: AdminLayoutComponent,
    // guard para validar el acceso sin estar logueado
    canActivate:[RolesGuard],
    children: [
        {
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
  }]},

  // direccion para cuando dentro del tablero me redirija al dashboard 
  {
    path: '**',
    redirectTo: 'dashboard'
  },

  // path iniciar el logging component
  {
    path: 'login',
    component: LoginComponent
  },
];



@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
