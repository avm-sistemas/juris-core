import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { RecoverComponent } from './components/authentication/recover/recover.component';
import { AccountComponent } from './components/authentication/account/account.component';

import { CustomersComponent } from './components/juris/customers/customers.component';
import { LawyersComponent } from './components/juris/lawyers/lawyers.component';
import { AttachmentsComponent } from './components/juris/attachments/attachments.component';
import { PartiesInvolvedComponent } from './components/juris/parties-involved/parties-involved.component';
import { ProcessesComponent } from './components/juris/processes/processes.component';
import { ProgressComponent } from './components/juris/progress/progress.component';
import { CustomerServiceComponent } from './components/juris/customer-service/customer-service.component';
import { ScheduleComponent } from './components/juris/schedule/schedule.component';
import { ProcessDetailComponent } from './components/juris/processes/process-detail/process-detail.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {  path: 'home',  component: HomeComponent  },
    {  path: 'login',  component: LoginComponent  },
    {  path: 'register',  component: RegisterComponent  },
    {  path: 'recover',  component: RecoverComponent  },
    {  path: 'user',  component: AccountComponent  },

    {  path: 'customers',  component: CustomersComponent  },
    {  path: 'lawyers',  component: LawyersComponent  },
    {  path: 'attachments',  component: AttachmentsComponent  },
    {  path: 'parties-involved',  component: PartiesInvolvedComponent  },
    {  path: 'processes',  component: ProcessesComponent  },
    {  path: 'processes/:id/:mode' , component: ProcessDetailComponent },
    {  path: 'progress',  component: ProgressComponent  },    
    {  path: 'customer-service',  component: CustomerServiceComponent  },    
    {  path: 'schedule',  component: ScheduleComponent  },    
];
