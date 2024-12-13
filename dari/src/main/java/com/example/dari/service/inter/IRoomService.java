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
}

