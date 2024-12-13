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
@RequestMapping("/devices")
public class DeviceController {

    @Autowired
    private IDeviceService deviceService;

    @PostMapping
    public ResponseEntity<Device> saveDevice(@RequestBody Device device) {
        try {
            Device savedDevice = deviceService.saveDevice(device);
            return new ResponseEntity<>(savedDevice, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Device> updateDevice(@PathVariable Long id, @RequestBody Device device) {
        try {
            device.setId(id);
            Device updatedDevice = deviceService.updateDevice(device);
            return new ResponseEntity<>(updatedDevice, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDevice(@PathVariable Long id) {
        try {
            if (deviceService.deleteDevice(id)) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    public ResponseEntity<List<Device>> getAllDevices() {
        try {
            List<Device> devices = deviceService.getAllDevices();
            return new ResponseEntity<>(devices, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Device> getDeviceById(@PathVariable Long id) {
        try {
            Device device = deviceService.getDevice(id);
            return new ResponseEntity<>(device, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/by-name/{name}")
    public ResponseEntity<Device> findDeviceByName(@PathVariable String name) {
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

    @GetMapping("/count")
    public ResponseEntity<Integer> getQuantityOfDevices() {
        try {
            int quantity = deviceService.getQuantityOfDevices();
            return new ResponseEntity<>(quantity, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
