package com.example.dari.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.beans.Transient;
import java.time.Duration;
import java.time.LocalDateTime;

@Entity
public class Device {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name; // e.g., "Smart Light"
    private boolean isConnected; // true = Connected, false = Not Connected

    private boolean isActive; // true = ON, false = OFF

    private Double energyRate; // Energy consumed per minute (in kWh)

    @ManyToOne
    @JoinColumn(name = "room_id", referencedColumnName = "id")
    @JsonBackReference // Prevents infinite loop by not serializing the room here
    private Room room;

    private LocalDateTime turnedOnAt; // Time when the device was turned ON

    public Device(Long id, String name, boolean isConnected, boolean isActive, Double energyRate, Room room, LocalDateTime turnedOnAt) {
        this.id = id;
        this.name = name;
        this.isConnected = isConnected;
        this.isActive = isActive;
        this.energyRate = energyRate;
        this.room = room;
        this.turnedOnAt = turnedOnAt;
    }

    public Device() {
    }

    @Transient
    public Double getEnergyConsumption() {
        if (isActive && turnedOnAt != null) {
            Duration duration = Duration.between(turnedOnAt, LocalDateTime.now());
            long minutesOn = duration.toMinutes();
            return minutesOn * energyRate;
        }
        return 0.0;
    }

    public boolean equals(final Object o) {
        if (o == this) return true;
        if (!(o instanceof Device)) return false;
        final Device other = (Device) o;
        if (!other.canEqual((Object) this)) return false;
        final Object this$id = this.getId();
        final Object other$id = other.getId();
        if (this$id == null ? other$id != null : !this$id.equals(other$id)) return false;
        final Object this$name = this.getName();
        final Object other$name = other.getName();
        if (this$name == null ? other$name != null : !this$name.equals(other$name)) return false;
        if (this.isConnected() != other.isConnected()) return false;
        if (this.isActive() != other.isActive()) return false;
        final Object this$energyRate = this.getEnergyRate();
        final Object other$energyRate = other.getEnergyRate();
        if (this$energyRate == null ? other$energyRate != null : !this$energyRate.equals(other$energyRate))
            return false;
        final Object this$room = this.getRoom();
        final Object other$room = other.getRoom();
        if (this$room == null ? other$room != null : !this$room.equals(other$room)) return false;
        final Object this$turnedOnAt = this.getTurnedOnAt();
        final Object other$turnedOnAt = other.getTurnedOnAt();
        if (this$turnedOnAt == null ? other$turnedOnAt != null : !this$turnedOnAt.equals(other$turnedOnAt))
            return false;
        return true;
    }

    protected boolean canEqual(final Object other) {
        return other instanceof Device;
    }

    public int hashCode() {
        final int PRIME = 59;
        int result = 1;
        final Object $id = this.getId();
        result = result * PRIME + ($id == null ? 43 : $id.hashCode());
        final Object $name = this.getName();
        result = result * PRIME + ($name == null ? 43 : $name.hashCode());
        result = result * PRIME + (this.isConnected() ? 79 : 97);
        result = result * PRIME + (this.isActive() ? 79 : 97);
        final Object $energyRate = this.getEnergyRate();
        result = result * PRIME + ($energyRate == null ? 43 : $energyRate.hashCode());
        final Object $room = this.getRoom();
        result = result * PRIME + ($room == null ? 43 : $room.hashCode());
        final Object $turnedOnAt = this.getTurnedOnAt();
        result = result * PRIME + ($turnedOnAt == null ? 43 : $turnedOnAt.hashCode());
        return result;
    }

    public String toString() {
        return "Device(id=" + this.getId() + ", name=" + this.getName() + ", isConnected=" + this.isConnected() + ", isActive=" + this.isActive() + ", energyRate=" + this.getEnergyRate() + ", room=" + this.getRoom() + ", turnedOnAt=" + this.getTurnedOnAt() + ")";
    }

    public Long getId() {
        return this.id;
    }

    public String getName() {
        return this.name;
    }

    public boolean isConnected() {
        return this.isConnected;
    }

    public boolean isActive() {
        return this.isActive;
    }

    public Double getEnergyRate() {
        return this.energyRate;
    }

    public Room getRoom() {
        return this.room;
    }

    public LocalDateTime getTurnedOnAt() {
        return this.turnedOnAt;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setConnected(boolean isConnected) {
        this.isConnected = isConnected;
    }

    public void setActive(boolean isActive) {
        this.isActive = isActive;
    }

    public void setEnergyRate(Double energyRate) {
        this.energyRate = energyRate;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

    public void setTurnedOnAt(LocalDateTime turnedOnAt) {
        this.turnedOnAt = turnedOnAt;
    }
}