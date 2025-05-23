import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TeamsComponent } from './pages/teams/teams.component';
import { DriversComponent } from './pages/drivers/drivers.component';
import { HistoryComponent } from './pages/history/history.component';
import { RulesComponent } from './pages/rules/rules.component';
import { CareerComponent } from './pages/career/career.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ServicesTermsComponent } from './components/services-terms/services-terms.component';
import { PrivacyPoliticsComponent } from './components/privacy-politics/privacy-politics.component';



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
        component: LoginComponent
    },
    {
        path: 'signup',
        component: SignupComponent
    },
    {
        path: 'Termos-Serviço',
        component: ServicesTermsComponent
    },
    {
        path: 'Politicas-Privacidade',
        component: PrivacyPoliticsComponent
    }
];
