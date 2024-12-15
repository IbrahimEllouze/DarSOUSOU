package com.example.dari.service.inter;

import java.util.List;
import com.example.dari.entities.Device;

import java.util.List;

public interface IDeviceService {

    Device saveDevice(Device device);

    Device updateDevice(Device device);

    boolean deleteDevice(Long id);

    List<Device> getAllDevices();

    Device getDevice(Long id);

    Device findDeviceByName(String name);

    int getQuantityOfDevices();

	List<Device> getConnectedDevices();

	List<Device> getDevicesByRoom(Long userId, Long roomId);

	Device updateDeviceInRoom(Long userId, Long roomId, Long deviceId, Device deviceDetails);

	boolean removeDeviceFromRoom(Long userId, Long roomId, Long deviceId);

	

}
