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


import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
@Getter 
@Setter
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Home {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name; // e.g., "John's Home"

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    @JsonBackReference // Prevents infinite loop by not serializing the user here
    private User user;

    @OneToMany(mappedBy = "home", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference // Allows proper serialization of rooms
    private List<Room> rooms;
}



