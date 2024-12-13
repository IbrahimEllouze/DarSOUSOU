package com.example.dari.service.inter;

import java.util.List;

import com.example.dari.entities.Device;

public interface DeviceService {
    Device createDevice(Long roomId, Device device);

    List<Device> getDevicesByRoom(Long roomId);

    Device getDeviceById(Long deviceId);

    void updateDeviceStatus(Long deviceId, boolean status);

    void deleteDevice(Long deviceId);
}
