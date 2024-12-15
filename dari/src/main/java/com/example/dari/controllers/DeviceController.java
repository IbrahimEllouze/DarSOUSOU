package com.example.dari.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.dari.entities.Device;
import com.example.dari.service.inter.IDeviceService;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/users/{userId}/devices")
public class DeviceController {

    @Autowired
    private IDeviceService deviceService;

    /**
     * Endpoint to add a device to a room if the room ID is not null.
     */
    @PostMapping("/add-device")
    public ResponseEntity<Device> addDeviceToRoom(@PathVariable Long userId, @RequestBody Device device) {
        try {
            if (device.getRoom() != null && device.getRoom().getId() != null) {
                Device savedDevice = deviceService.saveDevice(device);
                return new ResponseEntity<>(savedDevice, HttpStatus.CREATED);
            } else {
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Endpoint to find a device by its name.
     */
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
            return new ResponseEntity<>(connectedDevices, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



}
