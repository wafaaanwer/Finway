import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './shared/login/login.component';
import { RegisterComponent } from './shared/register/register.component';
import { PersonListingComponent } from './features/person-listing/person-listing.component';
import { PersonAddEditComponent } from './features/person-add-edit/person-add-edit.component';

const routes: Routes = [
  {path: '', component: LoginComponent },
  {path: 'login', component: LoginComponent },
  {path: 'register', component: RegisterComponent },
  {path: 'persons', component:  PersonListingComponent},
  {path: 'person-add-edit/:id', component:  PersonAddEditComponent},
  {path: 'person-add-edit', component:  PersonAddEditComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
