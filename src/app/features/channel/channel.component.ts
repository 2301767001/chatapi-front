import { HttpClient } from "@angular/common/http";
import { Component, inject, OnInit } from "@angular/core";
import { UserType } from "../../models/user.model";
import { UserService } from "../../service/user.service";
import { Router, RouterOutlet } from "@angular/router";
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from "@angular/material/button";
import { RouterModule } from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import { FormControl } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { User } from "../../models/user.interFace";
import { combineLatest } from "rxjs";
import { FormsModule } from "@angular/forms";

@Component({
    selector    : 'page-channel',
    imports     : [RouterOutlet,MatListModule, MatCardModule, MatFormFieldModule, MatInputModule, 
                   MatButtonModule, RouterModule, ReactiveFormsModule,  MatAutocompleteModule,FormsModule],
    templateUrl : './channel.component.html',
    styleUrl    : './channel.component.css'
})

export class ChannelPage implements OnInit {

    public userCollection: UserType[]= [];
     public isEditFormVisible = false;
     public selectedUser: UserType | null = null;
     public isCreateFormVisible = false;
     $searchControler = new FormControl('');
     $user = combineLatest;
  
    
     private userService = inject(UserService);
     private router      = inject(Router);

     private httpClient = inject(HttpClient)
    
     constructor(private usersService: UserService ) {
     
     }
     
    
     public ngOnInit(): void {
     
     this.userService.getAllUsers;
     
    
     }
     
      public getAllUsers() {
        this.userService.getAllUsers().subscribe((result: any) => {
        console.log(result);
        this.userCollection = result.data[0]; 
            console.log(this.userCollection); 
        },
        (error) => {
            console.error('Error fetching users:', error);
    
        })
    
       }
    
       public processOnCreate() {
    
        this.isCreateFormVisible = true;
        this.selectedUser = null;
    
       }
    
    public processOnCreateUser($inputValue:string) {
    
      this.userService.createNewUser({ userName: $inputValue 
    
      }).subscribe((result: any) => {
    
        console.log(result);
        this.getAllUsers();
    
      });
      
    }
    
    public processOnEdit($selectedUser: UserType) {
    
      this.isEditFormVisible = true;
      this.selectedUser      = $selectedUser;
    
    }
    
    public processOnSave() {
    
      this.userService.updateUser(this.selectedUser!).subscribe((result) =>{
    
        console.log(result);
    
      });
    
    }
    
    public processOnChangeUserName($userInput: string) {
    
      if(this.selectedUser) {
        this.selectedUser.userName = $userInput;
    
      }
    }
    
    public processOnDelete($selectedUser: UserType) {
    
      this.userService.removeUser($selectedUser.id!).subscribe((result: any) =>{
        this.getAllUsers();
    
      });
    
    }

    public processOnNavigate($user: UserType) {
      this.router.navigateByUrl('/channels');

    }
    


}