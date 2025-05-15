import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TeamsComponent } from './pages/teams/teams.component';
import { DriversComponent } from './pages/drivers/drivers.component';
import { HistoryComponent } from './pages/history/history.component';
import { RulesComponent } from './pages/rules/rules.component';
import { CareerComponent } from './pages/career/career.component';
import { SignupLayoutComponent } from './components/signup-layout/signup-layout.component';
import { LoginLayoutComponent } from './components/login-layout/login-layout.component';


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
    },
    {
        path: 'login',
        component: LoginLayoutComponent
    },
    {
        path: 'signup',
        component: SignupLayoutComponent
    }
];
