import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { Device, Room } from '../../models/home.model';

@Component({
  selector: 'app-energy-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  rooms: Room[] = [];
  devices: Device[] = [];
  totalDevices = 5; // Example to randomly generate devices if not fetched from the API.

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    const userId = 1; // Example user ID

    // Fetch rooms
    this.homeService.getRoomsByUserId(userId).subscribe({
      next: (data: Room[]) => {
        this.rooms = data;
      },
      error: (err) => {
        console.error('Failed to fetch rooms:', err);
        this.rooms = []; // Fallback to empty if fetch fails
      }
    });

    // Fetch devices for the first room if available
    this.homeService.getDevicesByRoom(userId, 1).subscribe({
      next: (data: Device[]) => {
        this.devices = data.length
          ? data.map(device => ({
              ...device,
              randomConsumption: this.generateRandomConsumption()
            }))
          : this.generateDummyDevices();
      },
      error: (err) => {
        console.error('Failed to fetch devices:', err);
        this.devices = this.generateDummyDevices(); // Fallback to dummy devices if fetch fails
      }
    });
  }

  // Generate random consumption values
  generateRandomConsumption(): number {
    return Math.floor(Math.random() * 100) + 1;
  }

  // Generate dummy devices if none are fetched from API
  generateDummyDevices(): Device[] {
    const devices: Device[] = [];
    for (let i = 0; i < this.totalDevices; i++) {
      devices.push({
        id: i + 1,
        name: `Device ${i + 1}`,
        randomConsumption: this.generateRandomConsumption(),
        room: undefined,
        energyRate: 0,
        turnedOnAt: '',
        active: false,
        connected: false,
        roomId: null
      });
    }
    return devices;
  }

  // Assign colors to rooms in a cyclic manner
  getRandomColor(index: number): string {
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#FFFF33', '#FF33FF'];
    return colors[index % colors.length];
  }

  // Calculate percentage for rooms
  getRoomPercentage(): number {
    return this.rooms.length > 0 ? Math.round(100 / this.rooms.length) : 0;
  }
}
