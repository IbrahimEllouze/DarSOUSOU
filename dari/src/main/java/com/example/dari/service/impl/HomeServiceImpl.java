package com.example.dari.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.dari.entities.Home;
import com.example.dari.repository.HomeRepository;
import com.example.dari.service.inter.IHomeService;

import java.util.List;
import java.util.Optional;

@Service
public class HomeServiceImpl implements IHomeService {

	@Autowired
    private final HomeRepository homeRepository;

    public HomeServiceImpl(HomeRepository homeRepository) {
        this.homeRepository = homeRepository;
    }

    @Override
    public Home saveHome(Home home) {
        return homeRepository.save(home);
    }

    @Override
    public Home updateHome(Home home) {
        return homeRepository.save(home);
    }

    @Override
    public boolean deleteHome(Long id) {
        if (homeRepository.existsById(id)) {
            homeRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public List<Home> getAllHomes() {
        return homeRepository.findAll();
    }

    @Override
    public Home getHome(Long id) {
        return homeRepository.findById(id).orElse(null);
    }

    @Override
    public Home findHomeByName(String name) {
        return homeRepository.findByName(name);
    }

    @Override
    public int getQuantityOfHomes() {
        return (int) homeRepository.count();
    }
}
