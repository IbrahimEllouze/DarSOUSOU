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
onHomeNameBlur($event: FocusEvent) {
throw new Error('Method not implemented.');
}
  home: Home | null = null;
  errorMessage: string | null = null;
  isEditingHomeName: boolean = false; // Track inline editing state
  isAddingRoom: boolean = false; // For adding a new room
  newRoomName: string = '';
  userId!: number; // Store userId as a class property

  constructor(private homeService: HomeService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.userId = +this.route.snapshot.paramMap.get('userId')!; // Assign userId to a class property
    this.loadHome(this.userId);
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

  // Toggle between inline editing and non-editing mode
  toggleEditingHomeName(): void {
    this.isEditingHomeName = !this.isEditingHomeName;
    if (!this.isEditingHomeName) {
      this.updateHomeName(); // Save the updated name when exiting edit mode
    }
  }
  enterConnectedDevices(): void {
    this.router.navigate([`/users/${this.userId}/devices/connected`]);
  }
  // Handle real-time updates when editing
  onHomeNameInput(event: Event): void {
    const target = event.target as HTMLElement;
    if (this.home) {
      this.home.name = target.innerText; // Update the home name dynamically
    }
  }

  // Save the updated home name
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
          this.home!.rooms = this.home!.rooms.filter(room => room.id !== roomId); // Remove the room from the list
        },
        error: (error) => {
          this.errorMessage = 'Failed to remove the room.';
          console.error(error);
        }
      });
    }
  }

  editRoomName(room: Room): void {
    if (!room.isEditingName) {
      // Start editing: store current name for potential rollback
      room.newRoomName = room.name;
      room.isEditingName = true;
    } else {
      // Save new name and stop editing
      const oldName = room.name; // Backup current name
      room.name = room.newRoomName || room.name; // Optimistically update the UI
      room.isEditingName = false;
  
      this.homeService.updateRoomName(this.home!.id!, room.id, room.newRoomName!).subscribe({
        next: (updatedRoom: Room) => {
          const roomIndex = this.home!.rooms.findIndex(r => r.id === room.id);
          if (roomIndex !== -1) {
            this.home!.rooms[roomIndex] = updatedRoom; // Update the room object
          }
          room.name = updatedRoom.name; // Update the room name
        },
        error: (error) => {
          this.errorMessage = 'Failed to update room name.';
          room.name = oldName; // Revert to the old name on failure
          console.error(error);
        }
      });
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
    this.router.navigate([`/homes/${this.userId}/rooms/${roomId}/devices`]); // Use the class property userId
  }
  enterHome(): void {
    this.router.navigate([`/homes/${this.userId}/rooms`]); // Use the class property userId
  }
  toggleRoomEdit(room: Room): void {
    room.isEditingName = !room.isEditingName;
  }
}