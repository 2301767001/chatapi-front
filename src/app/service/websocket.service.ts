import { Injectable } from "@angular/core";
import { Client, Message } from '@stomp/stompjs';
import { BehaviorSubject } from "rxjs";
import SockJS from 'sockjs-client';

@Injectable({
    providedIn: 'root'

})

export class WebSocketService {

    stompClient: Client | null = null;

    private messageSubject      = new BehaviorSubject<any>(null);
    public $message             = this.messageSubject.asObservable();

    private connectionSubeject  = new BehaviorSubject<boolean>(false);
    public $connectionStatus    = this.connectionSubeject.asObservable();
    
    connect($username: string) {

        const socket = new SockJS('http://localhost:8165/ws');

        this.stompClient = new Client ({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            debug: (str) => console.log(str)
            
        });

        this.stompClient.onConnect = (frame) => {
            console.log("Connected to webSocket server");

            this.stompClient?.subscribe('/topic/public', (message: Message) => {

            });

            this.stompClient?.publish ({
                destination: '/app/chat.addUser',
                body: JSON.stringify({sender: $username, type: 'JOIN' }) 
            });
        };

        this.stompClient.onStompError = (frame) => {
            console.error('Broke reported error: ' + frame.headers['message']);
            console.error('Additional details: ' + frame.body);

        };
    }
    
    sendMessage(username: string, content: string) {
        if(this.stompClient && this.stompClient.connected) {

            const chatMessage = {sender: username, content: content, type: 'CHAT'};

            console.log('Message sent by ${username}: ${content}');

            this.stompClient.publish ({
                destination: '/app/chat.sendMessage',
                body: JSON.stringify(chatMessage)
            });
         } else {

            console.log('WebSocket is not connected. Unable to send message.');

            }

        }

    disconnect() {
        if(this.stompClient) {
            this.stompClient.deactivate(); 
        }
    }

   
}

   