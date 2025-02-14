
import { NgModule } from "@angular/core";
import { LoginPage } from "../login/login.component";
import { RegisterPage } from "./componenets/register/register.component";
import { CommonModule } from "@angular/common";
import { PublicRouterModule } from "./public.routing,module";
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from "@angular/material/button";
import {ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  
    imports: [
        CommonModule,
        PublicRouterModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        RouterModule,
          
    ],
    
    
})

export class PublicModule {


}