import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Route } from '@angular/router';
import { AppComponent } from './app.component';
import { MoviesComponent } from './components/movies/movies.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { UtentiComponent } from './components/utenti/utenti.component';
import { Error404Component } from './components/error404/error404.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DetailsComponent } from './components/details/details.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { AuthGuard } from './auth/auth.guard';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth/auth.service';
import { TokenInterceptor } from './auth/token.interceptor';

const rotte: Route[] = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: 'home',
        component: HomeComponent,
        children: [
            {
            path: 'login',
            component: LoginComponent,
            },
            {
            path: 'register',
            component: RegisterComponent,
            }
        ]
    },

    {
    path: 'movie-details/:id',
    component: MovieDetailsComponent,
    canActivate: [AuthGuard]
    },

    {
        path: 'utenti',
        component: UtentiComponent,
        canActivate: [AuthGuard]
    },

    {
        path: 'login',
        component: LoginComponent,
    },


    {
        path: 'register',
        component: RegisterComponent,
    },

    {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard],
         children:[
            {
            path:'details',
            component: DetailsComponent,
         },
         {
            path: 'favorite',
            component: FavoritesComponent,
         },
    ]
    },

    {
        path: 'movies',
        component: MoviesComponent,
        canActivate: [AuthGuard]
    },

    {
    path: '**',
    component: Error404Component,
    }

];

@NgModule({
    declarations: [
        AppComponent,
        MoviesComponent,
        ProfileComponent,
        NavbarComponent,
        HomeComponent,
        UtentiComponent,
        Error404Component,
        LoginComponent,
        RegisterComponent,
        DetailsComponent,
        FavoritesComponent,
        MovieDetailsComponent,
    ],
    imports: [
        BrowserModule,
    RouterModule.forRoot(rotte),
    HttpClientModule,
    FormsModule],
    providers: [
        AuthGuard,AuthService,
        {
            provide:HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
