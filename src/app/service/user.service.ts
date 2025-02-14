import { Component, inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { User } from '../models/user.interFace';
import e from 'express';
import { UserType } from '../models/user.model';



@Injectable({providedIn:"root"})
export class UserService {

  private httpClient = inject(HttpClient);
  private url = 'http://localhost:8165/users';
  
   constructor(private http: HttpClient, private snackbar: MatSnackBar) {}

   public createNewUser($user: User): Observable<User> {
    return this.httpClient.post<User>(this.url, $user).pipe(
      tap((createdUser: User) => this.snackbar.open(`User ${createdUser.userName} Created successfuly`, `Close`, {
        duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'
      })),
      catchError(e => {
        this.snackbar.open(`User could not be created, due to: ${e.error.message}`, `Close`, {
          duration: 5000, horizontalPosition: 'right', verticalPosition: 'top' 
        })

        return throwError(e);
      })
      
    )

   }

    public getAllUsers(): Observable<User[]> {
      
      return this.httpClient.get(this.url) as Observable<User[]>
     

   }

   public updateUser($user: UserType) {

    return this.httpClient.put(this.url, $user);

}

public removeUser($id: number) {

  return this.httpClient.delete(`${this.url}/${$id}`);
  
}

}