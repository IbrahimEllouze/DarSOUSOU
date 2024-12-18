package com.example.dari.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.dari.entities.Device;
import com.example.dari.entities.Room;
import com.example.dari.service.inter.IDeviceService;
import com.example.dari.service.inter.IRoomService;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/users/{userId}/devices")
public class DeviceController {

    @Autowired
    private IDeviceService deviceService;
    @Autowired
    private IRoomService roomService;

    
    

    @PostMapping("/add-device")
    public ResponseEntity<Device> addDeviceToRoom(
            @PathVariable Long userId,
            @RequestBody Map<String, Long> payload) {
        try {
            Long deviceId = payload.get("deviceId");
            Long roomId = payload.get("roomId");

            if (deviceId == null) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }

            Device device = deviceService.getDevice(deviceId);
            if (device == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            if (roomId != null) {
                Room room = roomService.getRoom(roomId);
                if (room == null) {
                    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
                }
                device.setRoom(room);
            } else {
                device.setRoom(null);
            }

            Device updatedDevice = deviceService.saveDevice(device);
            return new ResponseEntity<>(updatedDevice, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }




    @PutMapping("/{deviceId}/update-room")
    public ResponseEntity<Device> updateDeviceRoom(
            @PathVariable Long userId,
            @PathVariable Long deviceId,
            @RequestBody Map<String, Long> payload) {
        try {
            Long roomId = payload.get("roomId");
            Device device = deviceService.getDevice(deviceId);

            if (device == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            Room room = roomId != null ? roomService.getRoom(roomId) : null;
            if (roomId != null && room == null) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }

            device.setRoom(room);
            Device updatedDevice = deviceService.saveDevice(device);
            return new ResponseEntity<>(updatedDevice, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/name/{name}")
    public ResponseEntity<Device> findDeviceByName(@PathVariable Long userId, @PathVariable String name) {
        try {
            Device device = deviceService.findDeviceByName(name);
            if (device != null) {
                return new ResponseEntity<>(device, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/connected")
    public ResponseEntity<List<Device>> getConnectedDevices() {
        try {
            List<Device> connectedDevices = deviceService.getConnectedDevices();
            if (connectedDevices.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(connectedDevices, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
