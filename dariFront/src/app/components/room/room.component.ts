import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  errorToast: string | null = null;
  
  // For editing room name
  isEditingRoomName: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private homeService: HomeService,
    private router: Router
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
        this.loading = false;
      }
    );
  }

  fetchDevices(): void {
    this.homeService.getDevicesByRoom(this.userId, this.roomId).subscribe(
      (data) => {
        // Initialize editing state for devices
        this.devices = data.map(device => ({
          ...device,
          isEditingName: false,
          newDeviceName: device.name
        }));
        this.loading = false;
      },
      (error) => {
        this.errorMessage = 'Error loading devices.';
        this.loading = false;
      }
    );
  }

  // Room Name Editing Methods
  toggleEditingRoomName(): void {
    this.isEditingRoomName = !this.isEditingRoomName;
    if (!this.isEditingRoomName) {
      this.saveRoomName();
    }
  }

  onRoomNameBlur(event: FocusEvent): void {
    if (this.isEditingRoomName) {
      this.saveRoomName();
      this.isEditingRoomName = false;
    }
  }

  onRoomNameInput(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      const inputElement = event.target as HTMLElement;
      inputElement.blur();
    }
  }

  private saveRoomName(): void {
    const newRoomName = (document.querySelector('.home-name span') as HTMLElement).textContent?.trim() || this.roomName;
    
    if (newRoomName && newRoomName !== this.roomName) {
      // Update room name in the service
      this.homeService.updateRoomName(this.userId, this.roomId, newRoomName).subscribe(
        () => {
          this.roomName = newRoomName;
        },
        (error) => {
          this.errorMessage = 'Error updating room name';
        }
      );
    }
  }

  // Device Name Editing Methods
  editDeviceName(device: Device): void {
    if (device.isEditingName) {
      // Save mode
      if (device.newDeviceName && device.newDeviceName.trim() !== device.name) {
        const updatedDevice = { ...device, name: device.newDeviceName.trim() };
        this.homeService.updateDevice(this.userId, this.roomId, device.id, updatedDevice).subscribe(
          () => {
            if (device.newDeviceName) {
              device.name = device.newDeviceName.trim();
            }
          },
          (error) => {
            this.errorMessage = 'Error updating device name';
          }
        );
      }
      device.isEditingName = false;
    } else {
      // Edit mode
      device.isEditingName = true;
      device.newDeviceName = device.name;
    }
  }

  toggleDeviceActive(device: Device): void {
    // Check if the device is not connected
    if (!device.connected) {
      this.showErrorToast("Unable to change state. Device is not connected.");
      return; // Prevent further execution
    }
  
    // Toggle active state
    device.active = !device.active;
  
    // Call service to update the device
    this.homeService.updateDevice(this.userId, this.roomId, device.id, device).subscribe(
      () => {
        // Success: Do nothing special
      },
      (error) => {
        // Revert the change if the update fails
        device.active = !device.active;
        this.showErrorToast("Error updating device status.");
      }
    );
  }

  updateDeviceRoomToNull(device: Device): void {
    device.roomId = null; // Set the roomId to null for this device
    this.homeService.updateDevice(this.userId, 0, device.id, device).subscribe(
      () => {
        
        this.fetchDevices(); // Refresh devices to reflect the changes
      },
      (error) => {
        this.showErrorToast('Error updating device room to null.');
      }
    );
  }
  

  enterConnectedDevices(): void {
    this.router.navigate([`/users/${this.userId}/devices/connected`]);
  }
  enterHome(): void {
    this.router.navigate([`/homes/${this.userId}/rooms`]); // Use the class property userId
  }
  addNewDevice(): void {
    // Navigate to add device page or open a modal to add a new device
    this.router.navigate([`/users/${this.userId}/rooms/${this.roomId}/add-device`]);
  }
  
  showErrorToast(message: string) {
    this.errorToast = message;
  
    // Automatically hide the error toast after 4 seconds
    setTimeout(() => {
      this.errorToast = null;
    }, 4000);
  }


 

  showSuccessToast(message: string): void {
    this.errorToast = null; // Hide previous error
    this.errorToast = message;
    setTimeout(() => {
      this.errorToast = null;
    }, 4000);
  }
}
