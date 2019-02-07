import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BlogComponent } from './blog/blog.component';
import { NewBlogComponent } from './blog/new-blog/new-blog.component';
import { AuthGuard } from './auth/auth.guard';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {path: '', component: BlogComponent, pathMatch: 'full'},
  {path: 'home', component: BlogComponent, pathMatch: 'full'},
  {path: 'profile', component: ProfileComponent, pathMatch: 'full'},
  {
    path: 'newblog',
    component: NewBlogComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
