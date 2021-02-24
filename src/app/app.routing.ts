import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const appRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'inicio', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegisterComponent },
    { path: 'logout/:sure', component: LoginComponent },
    { path: '**', component: NotFoundComponent }
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(appRoutes);