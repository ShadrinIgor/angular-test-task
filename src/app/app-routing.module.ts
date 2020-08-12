import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Route[] = [
  { path: '', loadChildren: () => import('./phone-book/phone-book.module').then(m => m.PhoneBookModule) },
  { path: 'track-record', loadChildren: () => import('./track-record/track-record.module').then(m => m.TrackRecordModule) },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: '/not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
