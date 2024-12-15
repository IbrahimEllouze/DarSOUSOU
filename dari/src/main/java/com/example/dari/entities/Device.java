package com.example.dari.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.beans.Transient;
import java.time.Duration;
import java.time.LocalDateTime;

import jakarta.persistence.*;

import com.example.dari.entities.Room;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Getter 
@Setter
public class Device {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name; // e.g., "Smart Light"
    private boolean isConnected; // true = Connected, false = Not Connected

    private boolean isActive; // true = ON, false = OFF

    private Double energyRate; // Energy consumed per minute (in kWh)

    @ManyToOne
    @JoinColumn(name = "room_id", nullable = false)
    @JsonBackReference // Prevents infinite loop by not serializing the room here
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