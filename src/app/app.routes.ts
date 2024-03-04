import { Routes } from '@angular/router';

export const rootRouterConfig: Routes = [
    { 
      path: '', 
      redirectTo: 'welcome', 
      pathMatch: 'full' 
    }, 
    {
      path: 'welcome',
      loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
      data: { title: 'Welcome' }
    },
    {
      path: 'new-game',
      loadChildren: () => import('./pages/game/game.module').then(m => m.GameModule),
      data: { title: 'New game' }
    },
    { 
      path: '**', 
      redirectTo: 'sessions/404'
    }
  ];