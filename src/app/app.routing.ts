import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { LoggedGuard } from './guards/logged/logged.guard';
import { LogoutGuard } from './guards/logout/logout.guard';
import { NotLoggedGuard } from './guards/not-logged/not-logged.guard';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'inicio', component: HomeComponent },
    { path: 'login', canActivate: [NotLoggedGuard], component: LoginComponent },
    { path: 'registro', canActivate: [NotLoggedGuard], component: RegisterComponent },
    { path: 'logout/:sure', canActivate: [LogoutGuard], component: LoginComponent },
    { path: 'perfil', canActivate: [LoggedGuard], component: UserProfileComponent },
    { path: 'perfil/editar', canActivate: [LoggedGuard], component: UserEditComponent },
    { path: '**', component: NotFoundComponent }
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(appRoutes);