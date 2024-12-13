package com.example.dari.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.beans.Transient;
import java.time.Duration;
import java.time.LocalDateTime;

import jakarta.persistence.*;

import com.example.dari.entities.Room;
import com.fasterxml.jackson.annotation.JsonProperty;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Device {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name; // e.g., "Smart Light"
    
    
   
    private boolean isConnected; // true = Connected, false = Not Connected
    
    @JsonProperty("isActive")
    private boolean isActive;// true = ON, false = OFF
    
    
    private Double energyRate; // Energy consumed per minute (in kWh)
    


    @ManyToOne
    @JoinColumn(name = "room_id", nullable = true) // Nullable for unassigned devices
    private Room room;

    private LocalDateTime turnedOnAt; // Time when the device was turned ON

    @Transient
    public Double getEnergyConsumption() {
        if (isActive && turnedOnAt != null) {
            Duration duration = Duration.between(turnedOnAt, LocalDateTime.now());
            long minutesOn = duration.toMinutes();
            return minutesOn * energyRate;
        }
        return 0.0;
    }
}
