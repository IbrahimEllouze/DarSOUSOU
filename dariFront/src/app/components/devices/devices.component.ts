import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../../services/device.service';
import { Device, Room } from '../../models/home.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private snackBar: MatSnackBar
  ) {
    this.roomForm = this.fb.group({
      roomId: [''],
    });
  }

  ngOnInit(): void {
    this.userId = this.extractUserIdFromUrl();
    this.loadConnectedDevices();
    this.fetchAvailableRooms();
  }

  private extractUserIdFromUrl(): number {
    return +this.router.url.split('/')[2];
  }

  private loadConnectedDevices(): void {
    this.deviceService.getConnectedDevices(this.userId).subscribe(
      (devices) => (this.connectedDevices = devices),
      (error) => console.error('Error fetching connected devices:', error)
    );
  }

  private fetchAvailableRooms(): void {
    this.deviceService.getAvailableRooms(this.userId).subscribe(
      (rooms) => (this.availableRooms = rooms),
      (error) => console.error('Error fetching available rooms:', error)
    );
  }

  onShowRoomDropdown(deviceId: number): void {
    this.selectedRoomId = this.selectedRoomId === deviceId ? null : deviceId;
  }

  onRoomSubmit(deviceId: number, currentRoomId: number | null): void {
    const roomId = this.roomForm.get('roomId')?.value;

    if (roomId === null || roomId === currentRoomId) {
      this.snackBar.open('No changes to update', 'Close', { duration: 2000 });
      return;
    }

    this.deviceService.addDeviceToRoom(this.userId, deviceId, roomId).subscribe(
      (updatedDevice) => {
        this.snackBar.open('Device room updated successfully!', 'Close', { duration: 2000 });
        this.loadConnectedDevices();
      },
      (error) => {
        console.error('Error updating device room:', error);
        this.snackBar.open('Failed to update device room', 'Close', { duration: 2000 });
      }
    );
  }

  enterHome(): void {
    this.router.navigate([`/homes/${this.userId}/rooms`]);
  }

  enterConnectedDevices(): void {
    this.router.navigate([`/users/${this.userId}/devices/connected`]);
  }

  getRoomName(roomId: number): string {
    const room = this.availableRooms.find((r) => r.id === roomId);
    return room ? room.name : 'Unknown Room';
  }
}
