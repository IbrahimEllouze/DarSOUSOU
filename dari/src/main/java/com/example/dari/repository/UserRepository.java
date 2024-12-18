package com.example.dari.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.dari.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);

    // Check if a username already exists
    boolean existsByUsername(String username);

    // Find user by username and password for authentication
    Optional<User> findByUsernameAndPassword(String username, String password);
}
