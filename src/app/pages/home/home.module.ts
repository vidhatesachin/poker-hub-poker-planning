import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import { HomeComponent } from './homepage/home.component';
import { HomeRoutes } from './home.routing';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(HomeRoutes)
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
