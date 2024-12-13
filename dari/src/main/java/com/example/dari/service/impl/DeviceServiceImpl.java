package com.example.dari.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.dari.entities.Device;
import com.example.dari.repository.DeviceRepository;
import com.example.dari.service.inter.IDeviceService;

import java.util.List;
import java.util.Optional;

@Service
public class DeviceServiceImpl implements IDeviceService {
	
	@Autowired
    private final DeviceRepository deviceRepository;

    public DeviceServiceImpl(DeviceRepository deviceRepository) {
        this.deviceRepository = deviceRepository;
    }

    @Override
    public Device saveDevice(Device device) {
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
}
