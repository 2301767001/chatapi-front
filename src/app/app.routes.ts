import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import path from 'node:path';
import { RegisterPage } from './features/public/componenets/register/register.component';
import { MessagePage } from './features/message/message.component';

export const routes: Routes = [

{
    path       : '',
    redirectTo : 'users',
    pathMatch  : 'full'

},

{

   path        : 'register',
   component   : RegisterPage

},
  
{
    path       : 'chat',
    component  : MessagePage

}   
];
