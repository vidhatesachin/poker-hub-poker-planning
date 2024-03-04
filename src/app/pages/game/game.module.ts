import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameRoutes } from './game.routing';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { NewGameComponent } from './new-game/new-game.component';
import { RoomComponent } from './room/room.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(GameRoutes)
  ],
  declarations: [NewGameComponent, RoomComponent]
})
export class GameModule { }
