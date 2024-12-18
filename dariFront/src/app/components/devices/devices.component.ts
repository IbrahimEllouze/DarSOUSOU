import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../../services/device.service';
import { Device, Room } from '../../models/home.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar

@Component({
  selector: 'app-device',
  standalone: false,
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css'],
})
export class DeviceComponent implements OnInit {
  connectedDevices: Device[] = [];
  userId!: number;
  roomForm: FormGroup;
  availableRooms: Room[] = [];
  selectedRoomId: number | null = null;

  constructor(
    private deviceService: DeviceService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar // Inject MatSnackBar
  ) {
    this.roomForm = this.fb.group({
      roomId: [''], // Form control to select a room
    });
  }

  ngOnInit(): void {
    this.loadConnectedDevices();
    this.userId = +this.router.url.split('/')[2]; // Get user ID from URL
    this.fetchAvailableRooms();
  }

  private loadConnectedDevices(): void {
    this.deviceService.getConnectedDevices(this.userId).subscribe(
      (devices) => {
        this.connectedDevices = devices;
      },
      (error) => {
        console.error('Error fetching connected devices:', error);
      }
    );
  }

  private fetchAvailableRooms(): void {
    this.deviceService.getAvailableRooms(this.userId).subscribe(
      (rooms) => {
        this.availableRooms = rooms;
      },
      (error) => {
        console.error('Error fetching available rooms:', error);
      }
    );
  }

  onShowRoomDropdown(deviceId: number): void {
    this.selectedRoomId = this.selectedRoomId === deviceId ? null : deviceId;
  }

  onRoomSubmit(deviceId: number, currentRoomId: number | null): void {
    const roomId = this.roomForm.get('roomId')?.value;
    if (roomId) {
      if (roomId === currentRoomId) {
        console.error('Selected room is the same as the current room.');
        return;
      }

      this.deviceService.addDeviceToRoom(this.userId, deviceId, roomId).subscribe(
        () => {
          this.snackBar.open(
            `Device ${currentRoomId ? 'updated' : 'added'} to room successfully.`,
            'Close',
            { duration: 3000 } // Show the message for 3 seconds
          );
          this.selectedRoomId = null;
          this.loadConnectedDevices();
        },
        (error) => {
          console.error('Error updating/adding device to room:', error);
        }
      );
    } else {
      console.error('No room selected!');
    }
  }

  enterHome(): void {
    this.router.navigate([`/homes/${this.userId}/rooms`]); // Use the class property userId
  }

  enterConnectedDevices(): void {
    this.router.navigate([`/users/${this.userId}/devices/connected`]);
  }

  getRoomName(roomId: number): string {
    const room = this.availableRooms.find((r) => r.id === roomId);
    return room ? room.name : 'Unknown Room';
  }
}
