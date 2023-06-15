import { Component, NgModule } from '@angular/core';
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
import { HttpClientModule } from '@angular/common/http';
import { DetailsComponent } from './components/details/details.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
const rotte: Route[] = [
    {
        path: '',
        component: HomeComponent,
    },

    {
    path: 'movie-details/:id',
    component: MovieDetailsComponent,
    },

    {
        path: 'utenti',
        component: UtentiComponent,
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
        component: MoviesComponent
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
    HttpClientModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
