import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { JwtModule } from '@auth0/angular-jwt';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import {AngularFireModule} from '@angular/fire/compat'
import { environment } from "./environments/environment";

export function tokenGetter() {
    return localStorage.getItem("Chatapi")
}

const config: SocketIoConfig = { url: 'http://localhost:8165', options: {
    extraHeaders: {
      
    }
}
 };

@NgModule({
 
    imports: [
        BrowserModule,
        HttpClientModule,
        MatSnackBarModule,
        BrowserAnimationsModule,
        AngularFireModule.initializeApp(environment.firebase),
        JwtModule.forRoot({

            config: {
                tokenGetter: tokenGetter,
                allowedDomains: ['localhost:8165']
            }

        }),
        
        SocketIoModule.forRoot(config)

    ],
    providers: [],
    
})

export class AppModule {


}