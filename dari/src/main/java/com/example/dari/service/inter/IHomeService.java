package com.example.dari.service.inter;

import java.util.List;
import com.example.dari.entities.Home;

public interface IHomeService {

    Home saveHome(Home home);

    Home updateHome(Home home);

    boolean deleteHome(Long id);

    List<Home> getAllHomes();

    Home getHome(Long id);

    Home findHomeByName(String name);

    int getQuantityOfHomes();
}
