import { Routes } from '@angular/router';
import { ThesesPage } from './theses-page/theses-page';
import { WelcomePage } from './welcome-page/welcome-page';
import { OverviewPage } from './overview-page/overview-page';
import { ResultsPage } from './results-page/results-page';

export const routes: Routes = [
  { path: "", component: WelcomePage },
  { path: "theses/:id", component: ThesesPage },
  { path: "overview", component: OverviewPage },
  { path: "results", component: ResultsPage }
];
