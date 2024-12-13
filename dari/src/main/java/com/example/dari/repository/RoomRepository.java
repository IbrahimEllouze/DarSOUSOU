package com.example.dari.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.dari.entities.Room;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    Room findByName(String name);
}