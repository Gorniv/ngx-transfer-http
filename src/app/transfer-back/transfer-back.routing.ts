import { Routes, RouterModule } from '@angular/router';

import { TransferBackComponent } from './transfer-back.component';

const routes: Routes = [
  {
    path: '', component: TransferBackComponent,
  },
];

export const TransferBackRoutes = RouterModule.forChild(routes);
