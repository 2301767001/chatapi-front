import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { User } from "../../models/user.interFace";
import { Observable, tap } from "rxjs";
import { LoginResponse } from "../../models/login-response.interface";

@Injectable({providedIn:"root" 

})

export class AuthService {

     private httpClient = inject(HttpClient);
      private url = 'http://localhost:8165/users';

    constructor(private http: HttpClient, private snackbar: MatSnackBar) {}

    login($user: User): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(this.url, $user).pipe(
            tap((res: LoginResponse) => localStorage.setItem('Chatapi', res.access_token)),
            tap(() => this.snackbar.open(`Login Successfull`, `Close`, {
                duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'
            }))
        );
    }


}