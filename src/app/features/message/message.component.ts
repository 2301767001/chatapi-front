import { AfterViewChecked, Component, ElementRef, OnInit, QueryList, ViewChildren } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { WebSocketService } from "../../service/websocket.service";
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import e from "express";
import { UserType } from "../../models/user.model";
import { UserService } from "../../service/user.service";




@Component({
  selector: 'app-chat',
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})

export class MessagePage implements OnInit, AfterViewChecked {

    ws = new WebSocket('ws://localhost:8165/chat');
    status = '';
    clients = [1];
    clientMessage: string = '';
    users: string[] = [''];
    activeUsers: string[] = [];
    messageQueue: { sender: string, text: string }[] = [];
    public userCollection: UserType[]= [];
    showUserList: boolean = false;
    selectedUser: any = null;
    showMenu: boolean = false;
    menuX: number = 0;
    menuY: number = 0;
   
   

    @ViewChildren('messageContainer') messageContainer!: QueryList<ElementRef>;
   


    constructor(private usersService: UserService) {


    }

    ngOnInit(): void {

        this.handleSocketEvents();
        this.randomizeNameArray();
        this.fetchAllUser();
        document.addEventListener('click', this.closeContextMenu.bind(this));
            
}

   
   ngAfterViewChecked(): void {

   }

   randomizeNameArray() {

    const newArr = [];
   }



   handleSocketEvents() {

    this.ws.onopen = (c: any) => {
        console.log(c);
        this.status = 'Connection established: ' + c.target.url;
    };
    this.ws.onerror = (e: any) => {
        console.log(e);
        this.status = 'Error connection';
    };
    this.ws.onclose = (c: any) => {
        console.log(c);
        this.status = 'Closed connection';
    };
    this.ws.onmessage = (message: any) => {
        console.log(message);
        this.status = 'Message received';
        this.broadcastMessage(message);

    };

    }

    addUser() {

        const $user = this.users[this.activeUsers.length];
        if($user) this.activeUsers.push($user);
        else this.activeUsers.push(`Guest ${(this.activeUsers.length - this.users.length) + 1}`);

        }

        //send($index: number) {

          //  const message = this.clientMessage[$index];
            //if(!message) return;
            //this.ws.send(this.activeUsers[$index]);
            //this.ws.send(message);
            //this.clientMessage[$index] = '';

       // }

        broadcastMessage(message: any) {

            this.messageQueue.push(message.data);

        }

        fetchAllUser() {
            this.usersService.getAllUsers().subscribe((result: any) => {
                this.userCollection = result.data[0];
                console.log(result);

            });

        }

        toggleUserList() {
            this.showUserList = !this.showUserList;

          }

          selectUser(user: UserType) {
            this.selectedUser = user.userName;
            console.log('users', user.userName )

    }

    send() {
        if (this.selectedUser && this.clientMessage.trim()) {
          this.messageQueue.push({ sender: this.selectedUser.name, text: this.clientMessage });
          this.clientMessage = ''; 
        } else {
          alert('');

        }
    }

        showContextMenu(event: MouseEvent, user: UserType) {
            event.preventDefault(); 
            this.selectedUser = user; 
            this.menuX = event.clientX; 
            this.menuY = event.clientY; 
            this.showMenu = true; 

      }

      editUser(user: UserType) {
        this.showMenu = false; 

      }

      deleteUser(user: UserType) {
        const index = this.userCollection.indexOf(user);
        if (index !== -1) {
          this.userCollection.splice(index, 1); 
         
        }
        this.showMenu = false; 

      }

      closeContextMenu() {
        this.showMenu = false;
      }

      


   
}
