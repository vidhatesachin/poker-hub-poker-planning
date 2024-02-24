import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../core/services/auth.service';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    AuthService
  ],
  exports: [
    MatButtonModule
  ]
})
export class SharedModule { }
