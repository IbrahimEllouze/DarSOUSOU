package com.example.dari.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.dari.entities.Home;

@Repository
public interface HomeRepository extends JpaRepository<Home, Long> {
    Home findByName(String name);
}
