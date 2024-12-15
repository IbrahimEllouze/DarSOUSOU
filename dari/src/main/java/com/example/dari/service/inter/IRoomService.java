package com.example.dari.service.inter;

import java.util.List;
import com.example.dari.entities.Room;

import java.util.List;

public interface IRoomService {

    Room saveRoom(Room room);

    Room updateRoom(Room room);

    boolean deleteRoom(Long id);

    List<Room> getAllRooms();

    Room getRoom(Long id);

    Room findRoomByName(String name);

    int getQuantityOfRooms();
    Room addRoomToHome(Long userId, Room room); // Add this method
    Room updateRoomName(Long userId, Long roomId, String newRoomName);

	Room getRoomById(Long roomId);

	List<Room> getRoomsByUser(Long userId); 
}

