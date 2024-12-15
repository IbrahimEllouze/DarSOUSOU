import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from '../../services/home.service';
import { Home, Room } from '../../models/home.model';


@Component({
  selector: 'app-home',
  standalone: false,
  
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  home: Home | null = null;
  errorMessage: string | null = null;
  isEditingHomeName: boolean = false;

  constructor(private homeService: HomeService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const userId = +this.route.snapshot.paramMap.get('userId')!;
    this.loadHome(userId);
  }

  loadHome(userId: number): void {
    this.homeService.getHomeByUserId(userId).subscribe({
      next: (home) => {
        this.home = home;
      },
      error: (error) => {
        console.error('Failed to load home details.', error);
      }
    });
  }

  toggleEditingHomeName(): void {
    this.isEditingHomeName = !this.isEditingHomeName;
    if (!this.isEditingHomeName) {
      this.updateHomeName(); // Save if we're done editing
    }
  }

  updateHomeName(): void {
    if (this.home && this.home.name.trim() !== '') {
      this.homeService.updateHomeName(this.home.id!, this.home.name).subscribe({
        next: (updatedHome) => {
          this.home = updatedHome; // Update the home details with the new name
          this.isEditingHomeName = false;
        },
        error: (error) => {
          this.errorMessage = 'Failed to update home name.';
          console.error(error);
        }
      });
    }
  }

  removeRoom(roomId: number): void {
    const userId = this.home?.id;
    if (userId) {
      this.homeService.removeRoom(userId, roomId).subscribe({
        next: () => {
          this.home!.rooms = this.home!.rooms.filter(room => room.id !== roomId);
        },
        error: (error) => {
          this.errorMessage = 'Failed to remove the room.';
          console.error(error);
        }
      });
    }
  }

  editRoomName(room: Room): void {
    if (room.isEditingName) {
      this.homeService.updateRoomName(this.home!.id!, room.id, room.newRoomName!).subscribe({
        next: (updatedRoom) => {
          const roomIndex = this.home!.rooms.findIndex(r => r.id === room.id);
          if (roomIndex !== -1) {
            this.home!.rooms[roomIndex] = updatedRoom;
            room.isEditingName = false; // Reset editing state
          }
        },
        error: (error) => {
          this.errorMessage = 'Failed to update room name.';
          console.error(error);
        }
      });
    } else {
      room.isEditingName = true;
      room.newRoomName = room.name; // Initialize the new room name with the current name
    }
  }

  enterRoom(roomId: number): void {
    this.router.navigate([`/rooms/${roomId}`]); // Navigate to room detail page
  }

  toggleRoomEdit(room: Room): void {
    room.isEditingName = !room.isEditingName;
  }
}