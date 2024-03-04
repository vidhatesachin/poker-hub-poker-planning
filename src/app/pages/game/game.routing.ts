import { Routes } from '@angular/router';
import { NewGameComponent } from './new-game/new-game.component';
import { RoomComponent } from './room/room.component';
export const GameRoutes: Routes = [
  { path: '', component: NewGameComponent },
  { path: 'game-room/:id', component: RoomComponent }
];