import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from '../../services/home.service';
import { Home, Room, Device } from '../../models/home.model';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  homeId: number;
  room: Room;
  isEditingRoomName = false;
  isAddingDevice = false;
  newDeviceName: string;
  errorMessage: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private homeService: HomeService
  ) {}

  ngOnInit(): void {
    this.homeId = +this.route.snapshot.paramMap.get('homeId');
    const roomId = +this.route.snapshot.paramMap.get('roomId');
    this.getRoomDetails(this.homeId, roomId);
  }

  getRoomDetails(homeId: number, roomId: number): void {
    this.homeService.getRoomById(homeId, roomId).subscribe(
      (room: Room) => {
        this.room = room;
      },
      (error) => {
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
        (error) => {
          this.errorMessage = 'Error updating room name';
        }
      );
    }
  }

  editDeviceName(device: Device): void {
    device.isEditingName = !device.isEditingName;
  }

  toggleDeviceActive(device: Device): void {
    device.active = !device.active; // Toggle active status
    this.homeService.updateDeviceStatus(this.homeId, this.room.id, device.id, device).subscribe(
      () => {},
      (error) => {
        this.errorMessage = 'Error updating device status';
      }
    );
  }

  removeDevice(deviceId: number): void {
    this.homeService.removeDeviceFromRoom(this.homeId, this.room.id, deviceId).subscribe(
      () => {
        this.room.devices = this.room.devices.filter(d => d.id !== deviceId);
      },
      (error) => {
        this.errorMessage = 'Error removing device';
      }
    );
  }

  addNewDevice(): void {
    this.isAddingDevice = true;
  }

  saveNewDevice(): void {
    if (this.newDeviceName) {
      const newDevice: Device = {
        id: Date.now(), // Generate a unique ID
        name: this.newDeviceName,
        energyRate: 0,
        turnedOnAt: new Date().toISOString(),
        active: true,
        connected: true,
      };
      this.homeService.addDeviceToRoom(this.homeId, this.room.id, newDevice).subscribe(
        (device) => {
          this.room.devices.push(device);
          this.isAddingDevice = false;
          this.newDeviceName = '';
        },
        (error) => {
          this.errorMessage = 'Error adding new device';
        }
      );
    }
  }

  cancelAddingDevice(): void {
    this.isAddingDevice = false;
    this.newDeviceName = '';
  }
}
