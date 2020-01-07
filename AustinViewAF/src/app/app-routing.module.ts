import { NgModule } from '@angular/core';
import { ImageComponent } from './images/image/image.component';
import { ImagesComponent } from './images/images.component';

import { Routes, RouterModule } from '@angular/router';
import { ImageListComponent } from './images/image-list/image-list.component';
import { ImageDetailComponent } from './images/image-detail/image-detail.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'image', component: ImagesComponent, children: [
    {path: 'upload', component: ImageComponent},
    {path: 'list', component: ImageListComponent},
    {path: 'list/:id', component: ImageDetailComponent}
  ]}
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ]

})
export class AppRoutingModule { }
