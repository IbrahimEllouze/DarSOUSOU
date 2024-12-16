package com.example.dari.service.inter;

import java.util.List;

import com.example.dari.entities.Home;


public interface HomeService {
    Home createHome(Long userId, Home home);

    List<Home> getAllHomes();

    Home getHomeById(Long homeId);

    void deleteHome(Long homeId);
}
