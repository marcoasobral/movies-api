import { Routes } from '@angular/router';
import { LoginComponent } from './auth/pages/login.component';
import { MoviesComponent } from './movies/pages/movies.component';
import { FavoritesComponent } from './favorites/pages/favorites.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { LoginGuard } from './auth/guards/login.guard';


export const routes: Routes = [
  { path: 'login', 
  component: LoginComponent,
  canActivate: [LoginGuard]  },
  { path: 'movies', 
  component: MoviesComponent,
  canActivate: [AuthGuard]
},
  { path: 'favorites', 
  component: FavoritesComponent,
  canActivate: [AuthGuard]
 }, 
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];