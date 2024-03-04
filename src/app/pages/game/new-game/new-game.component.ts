import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SocketService } from '../../../shared/socket.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrl: './new-game.component.scss'
})
export class NewGameComponent {
  gameForm!: FormGroup;
  roomParam = null;
  gameTypes = [
    { label: 'Fibonacci ( 0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, Split it!)', value: 'fobonacci' },
    { label: 'Modified Fibonacci ( 0, ½, 1, 2, 3, 5, 8, 13, 20, 40, 100, Split it!)', value: 'modified-fobonacci' }
  ];

  constructor(private formBuilder: FormBuilder, private socketService: SocketService, private router: Router, private route: ActivatedRoute) {
    this.gameForm = this.formBuilder.group({
      gameName: ['', Validators.required],
      displayName: ['', Validators.required],
      gameType: [this.gameTypes[0].value, Validators.required]
    });

  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.roomParam = params['room'];
      // If room query parameter is present, display only the display name field
      setTimeout(() => {
        if (this.roomParam) {
          this.gameForm.removeControl('gameName');
          this.gameForm.removeControl('gameType');
        }
      }, 300);
    });
  }

  onSubmit() {
    if (this.gameForm.invalid) {
      return;
    }
    const displayName = this.gameForm.get("displayName")?.value;
    window.localStorage.setItem("displayName",displayName);
    if(this.roomParam){
      //Joining exisiting room
      this.socketService.roomUrl = window.location.href;
      this.socketService.joinRoom(this.roomParam, displayName).subscribe(() => {
        this.router.navigate(['/new-game/game-room',this.roomParam]);
      });
    } else {
      //Creating new room
      this.socketService.createRoom().subscribe((roomId:string) => {
        this.socketService.isGameInitiator=true;
        this.socketService.roomUrl = window.location.href + '?room=' + roomId;
        this.socketService.joinRoom(roomId, displayName).subscribe((response:any) => {
          if (response.success) {
            this.router.navigate(['/new-game/game-room',roomId]);
          } else {
            console.error(response.message); // Error message
          }
        });
      });
    }
  }
  
  disconnect(){
    this.socketService.disconnect();
  }
  sendMessage() {
    this.socketService.sendMessage("Hey");
  }
}
