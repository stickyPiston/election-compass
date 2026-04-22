import { Routes } from '@angular/router';
import { ThesesPage } from './theses-page/theses-page';
import { WelcomePage } from './welcome-page/welcome-page';

export const routes: Routes = [
  { path: "", component: WelcomePage },
  { path: "theses/:id", component: ThesesPage }
];
