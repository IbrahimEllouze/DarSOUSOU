package com.example.dari.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.dari.entities.Home;
import com.example.dari.entities.Room;
import com.example.dari.repository.RoomRepository;
import com.example.dari.service.inter.IRoomService;
import com.example.dari.service.inter.IUserService;

import java.util.List;
import java.util.Optional;

@Service
public class RoomServiceImpl implements IRoomService {

    @Autowired
    private final RoomRepository roomRepository;

    @Autowired
    private final IUserService userService;  // Inject UserService

    public RoomServiceImpl(RoomRepository roomRepository, IUserService userService) {
        this.roomRepository = roomRepository;
        this.userService = userService;  // Assign userService
    }

    @Override
    public Room saveRoom(Room room) {
        return roomRepository.save(room);
    }

    @Override
    public Room updateRoom(Room room) {
        return roomRepository.save(room);
    }

    @Override
    public boolean deleteRoom(Long id) {
        if (roomRepository.existsById(id)) {
            roomRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    @Override
    public Room getRoom(Long id) {
        return roomRepository.findById(id).orElse(null);
    }

    @Override
    public Room findRoomByName(String name) {
        return roomRepository.findByName(name);
    }

    @Override
    public int getQuantityOfRooms() {
        return (int) roomRepository.count();
    }

    @Override
    public List<Room> getRoomsByUser(Long userId) {
        Home home = userService.getUserHome(userId);  // Use userService to get the user's home
        if (home != null) {
            return home.getRooms();
        } else {
            throw new IllegalArgumentException("Home not found for user " + userId);
        }
    }

    @Override
    public Room getRoomById(Long roomId) {
        return roomRepository.findById(roomId).orElse(null);
    }

    @Override
    public Room addRoomToHome(Long userId, Room room) {
        Home home = userService.getUserHome(userId);  // Use userService to get the user's home
        if (home != null) {
            room.setHome(home);
            return roomRepository.save(room);
        } else {
            throw new IllegalArgumentException("Home not found for user " + userId);
        }
    }

    @Override
    public Room updateRoomName(Long userId, Long roomId, String newRoomName) {
        Optional<Room> roomOptional = roomRepository.findByIdAndHome_UserId(roomId, userId);
        if (roomOptional.isPresent()) {
            Room room = roomOptional.get();
            room.setName(newRoomName);
            return roomRepository.save(room);
        } else {
            throw new IllegalArgumentException("Room not found for user " + userId + " and roomId " + roomId);
        }
    }
    @Override
    public boolean deleteRoom(Long userId, Long roomId) {
        Optional<Room> roomOptional = roomRepository.findByIdAndHome_UserId(roomId, userId);
        if (roomOptional.isPresent()) {
            roomRepository.delete(roomOptional.get());
            return true;
        }
        return false;
    }

}
