package com.example.dari.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.dari.entities.Device;
import com.example.dari.entities.Room;
import com.example.dari.repository.DeviceRepository;
import com.example.dari.repository.RoomRepository;
import com.example.dari.service.inter.IDeviceService;

import java.util.List;
import java.util.Optional;

@Service
public class DeviceServiceImpl implements IDeviceService {
    
    @Autowired
    private final DeviceRepository deviceRepository;
    @Autowired
    private final RoomRepository roomRepository;
    
    public DeviceServiceImpl(DeviceRepository deviceRepository, RoomRepository roomRepository) {
        this.deviceRepository = deviceRepository;
		this.roomRepository = roomRepository;
    }

    @Override
    public Device saveDevice(Device device) {
        if (device.getRoom() == null || device.getRoom().getId() == null) {
            throw new IllegalArgumentException("Room ID must be provided.");
        }
        Optional<Room> roomOptional = roomRepository.findById(device.getRoom().getId());
        if (!roomOptional.isPresent()) {
            throw new IllegalArgumentException("Room not found for device.");
        }
        return deviceRepository.save(device);
    }

    @Override
    public Device updateDevice(Device device) {
        return deviceRepository.save(device);
    }

    @Override
    public boolean deleteDevice(Long id) {
        if (deviceRepository.existsById(id)) {
            deviceRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public List<Device> getAllDevices() {
        return deviceRepository.findAll();
    }

    @Override
    public Device getDevice(Long id) {
        return deviceRepository.findById(id).orElse(null);
    }

    @Override
    public Device findDeviceByName(String name) {
        return deviceRepository.findByName(name);
    }

    @Override
    public int getQuantityOfDevices() {
        return (int) deviceRepository.count();
    }

    // Custom method to fetch connected devices
    @Override
    public List<Device> getConnectedDevices() {
        return deviceRepository.findByIsConnected(true);
    }
    @Override
    public Device updateDeviceInRoom(Long userId, Long roomId, Long deviceId, Device deviceDetails) {
        Optional<Device> optionalDevice = deviceRepository.findById(deviceId);
        if (optionalDevice.isPresent()) {
            Device existingDevice = optionalDevice.get();
            existingDevice.setName(deviceDetails.getName());
            existingDevice.setActive(deviceDetails.isActive());
            existingDevice.setEnergyRate(deviceDetails.getEnergyRate());
            existingDevice.setConnected(deviceDetails.isConnected());
            existingDevice.setTurnedOnAt(deviceDetails.getTurnedOnAt());
            return deviceRepository.save(existingDevice);
        }
        return null;
    }

    @Override
    public boolean removeDeviceFromRoom(Long userId, Long roomId, Long deviceId) {
        Optional<Device> optionalDevice = deviceRepository.findById(deviceId);
        if (optionalDevice.isPresent()) {
            deviceRepository.delete(optionalDevice.get());
            return true;
        }
        return false;
    }

	@Override
	public List<Device> getDevicesByRoom(Long userId, Long roomId) {
		return deviceRepository.findByRoomId(roomId);
	}

    

}
