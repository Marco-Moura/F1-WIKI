import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TeamsComponent } from './pages/teams/teams.component';
import { DriversComponent } from './pages/drivers/drivers.component';
import { HistoryComponent } from './pages/history/history.component';
import { RulesComponent } from './pages/rules/rules.component';
import { CareerComponent } from './pages/career/career.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'teams',
        component: TeamsComponent
    },
    {
        path: 'drivers',
        component: DriversComponent
    },
    {
        path: 'history',
        component: HistoryComponent
    },
    {
        path: 'rules',
        component: RulesComponent
    },
    {
        path: 'career',
        component: CareerComponent
    }
];
