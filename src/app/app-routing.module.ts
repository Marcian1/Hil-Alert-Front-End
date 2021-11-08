import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ResetComponent } from './reset/reset.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./authorized/authorized.module').then(m => m.AuthorizedModule)
  },
  { path: 'reset/:token', component: ResetComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    HttpClientModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
