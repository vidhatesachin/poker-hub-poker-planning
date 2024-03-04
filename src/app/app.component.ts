import { Component, OnDestroy } from '@angular/core';
import { io } from "socket.io-client";
import { SocketService } from './shared/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'poker-hub';

  constructor(private socketService:SocketService) {}

  ngOnDestroy(){
    this.socketService.disconnect();
  }
}


