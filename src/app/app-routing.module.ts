import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalysisComponent } from './analysis/analysis.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: "" , redirectTo : "login" , pathMatch : "full"
  },
  {
    path: "login" , component : LoginComponent,
  },
  {
    path: "register", component: RegisterComponent
  },
  {
    path: "file-upload", component: FileUploadComponent
  },
  {
    path: "analysis" , component: AnalysisComponent
  },
  { 
    path: '**', pathMatch: 'full', component: PageNotFoundComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
