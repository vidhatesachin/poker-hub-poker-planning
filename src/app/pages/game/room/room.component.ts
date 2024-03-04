import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SocketService } from '../../../shared/socket.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrl: './room.component.scss'
})
export class RoomComponent implements OnInit {
  roomId: string = '';
  users: string[] = [];
  displayName:string = '';
  constructor(private route: ActivatedRoute, public socketService:SocketService) {
    this.displayName = window.localStorage.getItem("displayName") as string;
  }

  ngOnInit(): void {
    
    // Get the room ID from the route parameters
    this.route.params.subscribe((params:any) => {
      this.roomId = params['id'];
      if(this.socketService.roomUrl===''){
        this.socketService.roomUrl = window.location.origin + "/#/new-game?room="+this.roomId;
      }
      this.socketService.joinRoom(this.roomId, this.displayName).subscribe((response:any) => {
        console.log(response);
      });
      
    });

    this.socketService.onUserListUpdate().subscribe((users: string[]) => {
      console.log("users :users :",users);
      this.users = users;
    });
  }

}
