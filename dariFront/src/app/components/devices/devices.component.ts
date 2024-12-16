import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../../services/device.service';
import { Device, Room } from '../../models/home.model';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-device',
  standalone: false,

  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DeviceComponent implements OnInit {
  connectedDevices: Device[] = [];
  userId!: number;
  roomForm: FormGroup;
  availableRooms: Room[] = [];
  selectedRoomId: number | null = null; // Track the selected room ID for each device

  constructor(
    private deviceService: DeviceService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.roomForm = this.fb.group({
      roomId: [''] // Form control to select a room
    });
  }

  ngOnInit(): void {
    this.loadConnectedDevices();
    this.userId = +this.router.url.split('/')[2]; // Get user ID from URL
    this.fetchAvailableRooms(); // Fetch available rooms
  }

  private loadConnectedDevices(): void {
    this.deviceService.getConnectedDevices(this.userId).subscribe(
      devices => {
        this.connectedDevices = devices; // Store connected devices
      },
      error => {
        console.error('Error fetching connected devices:', error);
      }
    );
  }

  private fetchAvailableRooms(): void {
    this.deviceService.getAvailableRooms(this.userId).subscribe(
      rooms => {
        this.availableRooms = rooms; // Store the available rooms for the dropdown
      },
      error => {
        console.error('Error fetching available rooms:', error);
      }
    );
  }

  onShowRoomDropdown(deviceId: number): void {
    this.selectedRoomId = this.selectedRoomId === deviceId ? null : deviceId;
  }
  
  onAddToRoom(deviceId: number): void {
    const roomId = this.roomForm.get('roomId')?.value; // Get the selected room ID
    if (roomId) {
      this.deviceService.addDeviceToRoom(this.userId, deviceId, roomId).subscribe(
        () => {
          console.log('Device added to room successfully.');
          this.selectedRoomId = null; // Hide the dropdown after submission
          this.loadConnectedDevices(); // Refresh the device list
        },
        error => {
          console.error('Error adding device to room:', error);
        }
      );
    } else {
      console.error('No room selected!');
    }
  }
  
  
  


  // Getter for the roomForm control
  get roomIdControl(): FormControl | null {
    return this.roomForm.get('roomId') as FormControl | null;
  }
}
