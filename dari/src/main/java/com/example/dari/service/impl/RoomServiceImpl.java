package com.example.dari.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.dari.entities.Room;
import com.example.dari.repository.RoomRepository;
import com.example.dari.service.inter.IRoomService;

import java.util.List;
import java.util.Optional;

@Service

public class RoomServiceImpl implements IRoomService {

	@Autowired
    private final RoomRepository roomRepository;

    public RoomServiceImpl(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
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
}
