package com.example.dari.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.dari.entities.Home;
import com.example.dari.entities.User;
import com.example.dari.repository.HomeRepository;
import com.example.dari.repository.UserRepository;
import com.example.dari.service.inter.IUserService;

import java.util.List;

@Service
public class UserServiceImpl implements IUserService {

    private final UserRepository userRepository;
    private final HomeRepository homeRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, HomeRepository homeRepository) {
        this.userRepository = userRepository;
        this.homeRepository = homeRepository;
    }

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User updateUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public boolean deleteUser(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUser(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public User findUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public int getQuantityOfUsers() {
        return (int) userRepository.count();
    }

    @Override
    public User registerUser(User user) {
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new IllegalArgumentException("Username already exists");
        }
        return userRepository.save(user);
    }

    @Override
    public User authenticateUser(User user) {
        return userRepository.findByUsernameAndPassword(user.getUsername(), user.getPassword())
                .orElseThrow(() -> new IllegalArgumentException("Invalid credentials"));
    }

    @Override
    public Home getUserHome(Long userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return user.getHome();
    }

    public Home updateHomeForUser(Long userId, String homeName) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Home home = user.getHome();
        if (home == null) {
            home = new Home();
            home.setUser(user);
        }
        home.setName(homeName);
        return homeRepository.save(home);
    }
}
