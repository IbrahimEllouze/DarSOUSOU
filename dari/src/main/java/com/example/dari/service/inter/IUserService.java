package com.example.dari.service.inter;

import java.util.List;

import com.example.dari.entities.User;

public interface IUserService {
    User saveUser(User user);
    User updateUser(User user);
    boolean deleteUser(Long id);
    List<User> getAllUsers();
    User getUser(Long id);
    User findUserByUsername(String username);
    int getQuantityOfUsers();

    // Add methods for registration and authentication
    User registerUser(User user);
    User authenticateUser(User user);
}
