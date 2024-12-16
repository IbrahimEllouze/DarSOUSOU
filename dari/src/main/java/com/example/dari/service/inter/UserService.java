package com.example.dari.service.inter;

import com.example.dari.entities.User;

import java.util.List;

import com.example.dari.entities.Home;
public interface UserService {
    User createUser(User user);

    User getUserById(Long userId);

    List<Home> getHomesByUser(Long userId); // Retrieve homes for a user
}
