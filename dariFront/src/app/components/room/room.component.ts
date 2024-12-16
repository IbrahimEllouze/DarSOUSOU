import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from '../../services/home.service';
import { Device } from '../../models/home.model';

@Component({
  selector: 'app-room',
  standalone: false,

  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  roomId!: number;
  userId!: number;
  roomName: string = '';
  devices: Device[] = [];
  loading: boolean = true;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private homeService: HomeService
  ) {}

  ngOnInit(): void {
    this.roomId = Number(this.route.snapshot.paramMap.get('roomId'));
    this.userId = Number(this.route.snapshot.paramMap.get('userId'));
    
    // Fetch room details including the room name
    this.homeService.getRoomsByUserId(this.userId).subscribe(
        rooms => {
            const room = rooms.find(r => r.id === this.roomId);
            if (room) {
                this.roomName = room.name;
            } else {
                this.roomName = ''; // Handle if room not found
            }
            this.fetchDevices();
        },
        error => {
            this.errorMessage = 'Error loading rooms';
        }
    );
}


  fetchDevices(): void {
    this.homeService.getDevicesByRoom(this.userId, this.roomId).subscribe(
      (data) => {
        this.devices = data;
        this.loading = false;
      },
      (error) => {
        this.errorMessage = 'Error loading devices.';
        this.loading = false;
      }
    );
  }

  toggleDeviceActive(device: Device): void {
    device.active = !device.active;
    this.homeService.updateDevice(this.userId, this.roomId, device.id, device).subscribe();
  }

  removeDevice(deviceId: number): void {
    this.homeService.removeDevice(this.userId, this.roomId, deviceId).subscribe(() => {
      this.devices = this.devices.filter((d) => d.id !== deviceId);
    });
  }

  updateDeviceName(device: Device, newName: string): void {
    device.name = newName;
    this.homeService.updateDevice(this.userId, this.roomId, device.id, device).subscribe();
  }
}
