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
 // For adding a new room
 isAddingRoom: boolean = false;
 newRoomName: string = '';
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
    const homeId = this.home?.id;
    if (homeId) {
      this.homeService.removeRoom(homeId, roomId).subscribe({
        next: () => {
          this.home!.rooms = this.home!.rooms.filter(room => room.id !== roomId);  // Remove the room from the list
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
        next: (updatedRoom: Room) => {
          // Find the room by ID and update its properties
          const roomIndex = this.home!.rooms.findIndex(r => r.id === room.id);
          if (roomIndex !== -1) {
            this.home!.rooms[roomIndex] = updatedRoom; // Update the entire room object
            room.isEditingName = false; // Reset editing state
          }
        },
        error: (error) => {
          this.errorMessage = 'Failed to update room name.';
          console.error(error);
        },
      });
    } else {
      room.isEditingName = true;
      room.newRoomName = room.name; // Initialize the new room name with the current name
    }
  }
  addNewRoom(): void {
    this.isAddingRoom = true;
    this.newRoomName = '';
  }

  saveNewRoom(): void {
    if (this.newRoomName.trim() && this.home) {
      const newRoom: Partial<Room> = { name: this.newRoomName }; // Use Partial to avoid temporary ID issues
      this.homeService.addRoomToHome(this.home.id!, newRoom).subscribe({
        next: (createdRoom) => {
          this.home!.rooms.push(createdRoom); // Add the room to the list
          this.isAddingRoom = false;
        },
        error: (error) => {
          this.errorMessage = 'Failed to add the room.';
          console.error(error);
        },
      });
    }
  }
  

  cancelAddingRoom(): void {
    this.isAddingRoom = false;
    this.newRoomName = '';
  }
  



  enterRoom(roomId: number): void {
    this.router.navigate([`/${roomId}/devices`]); // Navigate to room detail page
  }

  toggleRoomEdit(room: Room): void {
    room.isEditingName = !room.isEditingName;
  }
}