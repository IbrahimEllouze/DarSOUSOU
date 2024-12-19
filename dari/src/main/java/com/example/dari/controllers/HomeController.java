package com.example.dari.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.dari.entities.Device;
import com.example.dari.entities.Home;
import com.example.dari.entities.Room;
import com.example.dari.service.impl.UserServiceImpl;
import com.example.dari.service.inter.IDeviceService;
import com.example.dari.service.inter.IRoomService;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/homes")
public class HomeController {

    private final UserServiceImpl userService;
    private final IRoomService roomService;
    @Autowired
    private final IDeviceService deviceService;
    
    
    @Autowired
    public HomeController(UserServiceImpl userService, IRoomService roomService, IDeviceService deviceService) {
        this.userService = userService;
        this.roomService = roomService;
        this.deviceService = deviceService;
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Home> getHomeByUser(@PathVariable Long userId) {
        try {
            Home home = userService.getUserHome(userId);
            return new ResponseEntity<>(home, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }
    @DeleteMapping("/user/{userId}/rooms/{roomId}")
    public ResponseEntity<Void> removeRoom(@PathVariable Long userId, @PathVariable Long roomId) {
        try {
            boolean isDeleted = roomService.deleteRoom(userId, roomId);  // Call the correct service method
            if (isDeleted) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
                // Room successfully deleted
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Room not found for user
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PutMapping("/user/{userId}")
    public ResponseEntity<Home> updateUserHome(@PathVariable Long userId, @RequestBody Map<String, String> request) {
        if (!request.containsKey("name")) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        try {
            String homeName = request.get("name");
            Home updatedHome = userService.updateHomeForUser(userId, homeName);
            return new ResponseEntity<>(updatedHome, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }



    @GetMapping("/user/{userId}/rooms")
    public ResponseEntity<List<Room>> getRoomsByUser(@PathVariable Long userId) {
        try {
            Home home = userService.getUserHome(userId);
            if (home != null) {
                List<Room> rooms = home.getRooms();
                return new ResponseEntity<>(rooms, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/user/{userId}/rooms")
    public ResponseEntity<Room> addRoomToHome(@PathVariable Long userId, @RequestBody Room room) {
        try {
            Room createdRoom = roomService.addRoomToHome(userId, room);
            return new ResponseEntity<>(createdRoom, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PostMapping("/user/{userId}")
    public ResponseEntity<Home> createHomeForUser(@PathVariable Long userId, @RequestBody Map<String, String> request) {
        if (!request.containsKey("name")) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        try {
            String homeName = request.get("name");
            Home createdHome = userService.createHomeForUser(userId, homeName); // Implement this in UserServiceImpl
            return new ResponseEntity<>(createdHome, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/user/{userId}/rooms/{roomId}")
    public ResponseEntity<Room> updateRoomName(@PathVariable Long userId, @PathVariable Long roomId, @RequestBody String newRoomName) {
        try {
            Room updatedRoom = roomService.updateRoomName(userId, roomId, newRoomName);
            return new ResponseEntity<>(updatedRoom, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/user/{userId}/rooms/{roomId}/devices")
    public ResponseEntity<List<Device>> getDevicesByRoomAndUser(
            @PathVariable Long userId,
            @PathVariable Long roomId) {
        try {
            List<Device> devices = deviceService.getDevicesByRoom(userId, roomId);
            if (devices.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(devices, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/user/{userId}/rooms/{roomId}/devices/{deviceId}")
    public ResponseEntity<Device> updateDeviceInRoom(
            @PathVariable Long userId,
            @PathVariable Long roomId,
            @PathVariable Long deviceId,
            @RequestBody Device deviceDetails) {
        try {
            Device updatedDevice = deviceService.updateDeviceInRoom(userId, roomId, deviceId, deviceDetails);
            if (updatedDevice != null) {
                return new ResponseEntity<>(updatedDevice, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/user/{userId}/rooms/{roomId}/devices/{deviceId}")
    public ResponseEntity<Void> removeDeviceFromRoom(
            @PathVariable Long userId,
            @PathVariable Long roomId,
            @PathVariable Long deviceId) {
        try {
            boolean isRemoved = deviceService.removeDeviceFromRoom(userId, roomId, deviceId);
            if (isRemoved) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
}
