package com.example.dari.service.inter;

import java.util.List;

import com.example.dari.entities.Room;

public interface RoomService {
    Room createRoom(Long homeId, Room room);

    List<Room> getRoomsByHome(Long homeId);

    Room getRoomById(Long roomId);

    void deleteRoom(Long roomId);
}
