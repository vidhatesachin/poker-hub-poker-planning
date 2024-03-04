import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from "socket.io-client";

@Injectable({
  providedIn: 'root',
})
export class SocketService{
  roomUrl = '';
  isGameInitiator = false;
  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  socket = io('http://localhost:3000');
  constructor() {
    this.socket.on("connect",()=>{
      console.log('Connected to server: ', this.socket.id)  
    });
    this.socket.on("welcome",(msg)=>{
      console.log(msg);
    });
    this.socket.on("disconnect",()=>{
      console.log('disconnected server: ', this.socket.id)  
    });
  }

  public disconnect(){
    this.socket.disconnect();
  }
  

  public sendMessage(message: any) {
    this.socket.emit('message', message);
  }

  public getNewMessage = () => {
    this.socket.on('message', (message) =>{
      this.message$.next(message);
    });
    return this.message$.asObservable();
  }

  public createRoom(): Observable<string> {
    return new Observable<string>(observer => {
      // Emit an event to create a new room
      this.socket.emit('createRoom', (roomId: string) => {
        observer.next(roomId); // Pass the room ID to the observer
        observer.complete(); // Complete the observable
      });
    });
  }

  // Method to listen for userListUpdate event
  onUserListUpdate(): Observable<string[]> {
    return new Observable<string[]>((observer) => {
      this.socket.on('userListUpdate', (users: string[]) => {
        console.log("users : ",users);
        observer.next(users);
      });
    });
  }

  // Method to join a room on the server
  joinRoom(roomId: string, displayName: string): Observable<any> {
    return new Observable<void>(observer => {
      // Emit an event to join a room
      this.socket.emit('joinRoom', roomId, displayName, (response:any) => {
        observer.next(response); // Notify that room has been joined
        observer.complete(); // Complete the observable
      });
    });
  }
}
