import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map,Observable } from 'rxjs';
import { Device, Room } from '../models/home.model'; // Import Device and Room models


@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  private apiBaseUrl = 'http://localhost:8080/users'; // Base API URL

  constructor(private http: HttpClient) {}

  // Get connected devices for a user
  getConnectedDevices(userId: number): Observable<Device[]> {
    return this.http.get<Device[]>(`${this.apiBaseUrl}/${userId}/devices/connected`);
  }
  getAvailableRooms(userId: number): Observable<Room[]> {
    return this.http.get<Room[]>(`http://localhost:8080/homes/user/${userId}/rooms`).pipe(
        map(rooms => rooms.map(room => {
            // If you want to map room with its name directly.
            return { ...room, name: room.name };
        }))
    );
  }
  // Add device to a room
  addDeviceToRoom(userId: number, deviceId: number, roomId: number): Observable<Device> {
    const payload = { deviceId, roomId };
    return this.http.post<Device>(`http://localhost:8080/users/${userId}/devices/add-device`, payload);
  }

  
}
