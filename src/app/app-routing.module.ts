import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
<<<<<<< HEAD
import { GameComponent } from './pages/game/game.component';
=======
>>>>>>> f166f73c7f45ef4072fba866fef8214acd476927
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'about', component: AboutComponent},
<<<<<<< HEAD
  {path: 'game', component: GameComponent}
=======
>>>>>>> f166f73c7f45ef4072fba866fef8214acd476927
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
