import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Device, Home, Room } from '../models/home.model';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private apiBaseUrl = 'http://localhost:8080/homes';

  constructor(private http: HttpClient) {}

  // Fetch home by user ID
  getHomeByUserId(userId: number): Observable<Home> {
    return this.http.get<Home>(`${this.apiBaseUrl}/user/${userId}`);
  }

  // Update home name
  updateHomeName(userId: number, newHomeName: string): Observable<Home> {
    const payload = { name: newHomeName }; // Backend expects this structure
    return this.http.put<Home>(`${this.apiBaseUrl}/user/${userId}`, payload);
  }
  

  updateRoomName(userId: number, roomId: number, newRoomName: string): Observable<Room> {
    return this.http.put<Room>(`${this.apiBaseUrl}/user/${userId}/rooms/${roomId}`, newRoomName, {
      headers: { 'Content-Type': 'text/plain' },
    });
  }
  
  // Remove a room
  removeRoom(homeId: number, roomId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiBaseUrl}/user/${homeId}/rooms/${roomId}`);
  }
  
  addRoomToHome(userId: number, room: Partial<Room>): Observable<Room> {
    return this.http.post<Room>(`${this.apiBaseUrl}/user/${userId}/rooms`, room);
  }
  
  // Fetch rooms by user ID
  getRoomsByUserId(userId: number): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.apiBaseUrl}/user/${userId}/rooms`).pipe(
        map(rooms => rooms.map(room => {
            // If you want to map room with its name directly.
            return { ...room, name: room.name };
        }))
    );
  }
  toggleDeviceActive(homeId: number, roomId: number, deviceId: number, device: Device): Observable<void> {
    return this.http.put<void>(`${this.apiBaseUrl}/user/${homeId}/rooms/${roomId}/devices/${deviceId}`, device);
  }
  
  removeDeviceFromRoom(homeId: number, roomId: number, deviceId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiBaseUrl}/user/${homeId}/rooms/${roomId}/devices/${deviceId}`);
  }
  getRoomById(roomId: number): Observable<Room> {
  return this.http.get<Room>(`${this.apiBaseUrl}/rooms/${roomId}`);
}
updateDeviceInRoom(homeId: number, roomId: number, deviceId: number, device: Partial<Device>): Observable<Device> {
  return this.http.put<Device>(
    `${this.apiBaseUrl}/user/${homeId}/rooms/${roomId}/devices/${deviceId}`,
    device
  );
}

// Fetch devices by room and user
getDevicesByRoom(userId: number, roomId: number): Observable<Device[]> {
  return this.http.get<Device[]>(`${this.apiBaseUrl}/user/${userId}/rooms/${roomId}/devices`);
}

// Update a device
updateDevice(userId: number, roomId: number, deviceId: number, device: Device): Observable<Device> {
  return this.http.put<Device>(
    `${this.apiBaseUrl}/user/${userId}/rooms/${roomId}/devices/${deviceId}`,
    device
  );
}

updateDeviceRoomIdToNull(userId: number, deviceId: number): Observable<Device> {
  return this.http.put<Device>(
    `${this.apiBaseUrl}/user/${userId}/devices/${deviceId}/null-room`,
    {}
  );
}



}
