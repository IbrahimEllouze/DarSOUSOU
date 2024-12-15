import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from '../../services/home.service';
import { Home, Room, Device } from '../../models/home.model';

@Component({
  selector: 'app-room',
  standalone: false,
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  homeId: number = 0; // Initialize with default value
  room: Room = {} as Room; // Initialize with an empty object of type Room
  isEditingRoomName = false;
  isAddingDevice = false;
  newDeviceName: string = ''; // Initialize with default empty string
  errorMessage: string = ''; // Initialize with default empty string

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private homeService: HomeService
  ) {}

  ngOnInit(): void {
    this.homeId = +this.route.snapshot.paramMap.get('homeId')!;
    const roomId = +this.route.snapshot.paramMap.get('roomId')!;
    this.getRoomDetails(this.homeId, roomId);
  }

  getRoomDetails(homeId: number, roomId: number): void {
    this.homeService.getRoomById( roomId).subscribe(
      (room: Room) => {
        this.room = room;
      },
      (error: any) => {
        this.errorMessage = 'Error fetching room details';
      }
    );
  }

  toggleEditingRoomName(): void {
    this.isEditingRoomName = !this.isEditingRoomName;
  }

  updateRoomName(): void {
    if (this.room.newRoomName) {
      this.homeService.updateRoomName(this.homeId, this.room.id, this.room.newRoomName).subscribe(
        (updatedRoom) => {
          this.room = updatedRoom;
          this.isEditingRoomName = false;
        },
        (error: any) => {
          this.errorMessage = 'Error updating room name';
        }
      );
    }
  }

  editDeviceName(device: Device): void {
    device.isEditingName = !device.isEditingName; // Ensure this property exists in the `Device` model
  }

  toggleDeviceActive(device: Device): void {
    device.active = !device.active; // Toggle active status
    this.homeService.updateDeviceInRoom(this.homeId, this.room.id, device.id, device).subscribe(
      () => {},
      (error: any) => {
        this.errorMessage = 'Error updating device status';
      }
    );
  }

  removeDevice(deviceId: number): void {
    this.homeService.removeDeviceFromRoom(this.homeId, this.room.id, deviceId).subscribe(
      () => {
        this.room.devices = this.room.devices.filter(d => d.id !== deviceId);
      },
      (error: any) => {
        this.errorMessage = 'Error removing device';
      }
    );
  }

  cancelAddingDevice(): void {
    this.isAddingDevice = false;
    this.newDeviceName = '';
  }
}
