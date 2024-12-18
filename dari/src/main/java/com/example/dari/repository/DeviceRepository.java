package com.example.dari.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.dari.entities.Device;

@Repository
public interface DeviceRepository extends JpaRepository<Device, Long> {
    Device findByName(String name);
    List<Device> findByIsConnected(boolean isConnected);
    List<Device> findByRoomId(Long roomId);

    @Query(value = "select * from device where id= :id",nativeQuery = true)
    Device getDevice(@Param("id") Long id);



}
