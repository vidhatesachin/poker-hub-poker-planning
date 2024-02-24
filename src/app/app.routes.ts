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
      path: '**', 
      redirectTo: 'sessions/404'
    }
  ];