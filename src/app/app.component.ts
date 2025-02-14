import { Component, inject, } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserType } from './models/user.model';
import { UserService } from './service/user.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {

      


}


  

