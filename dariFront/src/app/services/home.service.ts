import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Home, Room } from '../models/home.model';

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
  updateHomeName(homeId: number, homeName: string): Observable<Home> {
    return this.http.put<Home>(`${this.apiBaseUrl}/user/${homeId}`, { name: homeName });
  }

  // Update room name
  updateRoomName(userId: number, roomId: number, newRoomName: string): Observable<Room> {
    return this.http.put<Room>(`${this.apiBaseUrl}/user/${userId}/rooms/${roomId}`, { name: newRoomName });
  }

  // Remove a room
  removeRoom(userId: number, roomId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiBaseUrl}/user/${userId}/rooms/${roomId}`);
  }

  // Fetch rooms by user ID
  getRoomsByUserId(userId: number): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.apiBaseUrl}/user/${userId}/rooms`);
  }
}
