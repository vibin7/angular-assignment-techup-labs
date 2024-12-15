import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

// export const routes: Routes = [];
export const routes: Routes = [
    {
      path: '', // Base path for LayoutComponent
      component: LayoutComponent,
      children: [
        { path: "", redirectTo: "customer", pathMatch: "full" },
        {
          path: 'pins', // Route for ListComponent
          loadComponent: () =>
            import('./containers/pins-list/pins-list.component').then((m) => m.PinsListComponent),
        },
        {
            path: 'customer', // Route for ListComponent
            loadComponent: () =>
              import('./containers/customer-list/customer-list.component').then((m) => m.CustomerListComponent),
          },
      ],
    },
    {
      path: '**', // Catch-all route
      redirectTo: 'customer',
    },
  ];