package com.example.dari.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.dari.entities.Home;
import com.example.dari.service.inter.IHomeService;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/homes")
public class HomeController {

    @Autowired
    private IHomeService homeService;

    @PostMapping
    public ResponseEntity<Home> saveHome(@RequestBody Home home) {
        try {
            Home savedHome = homeService.saveHome(home);
            return new ResponseEntity<>(savedHome, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Home> updateHome(@PathVariable Long id, @RequestBody Home home) {
        try {
            home.setId(id);
            Home updatedHome = homeService.updateHome(home);
            return new ResponseEntity<>(updatedHome, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHome(@PathVariable Long id) {
        try {
            if (homeService.deleteHome(id)) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    public ResponseEntity<List<Home>> getAllHomes() {
        try {
            List<Home> homes = homeService.getAllHomes();
            return new ResponseEntity<>(homes, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Home> getHomeById(@PathVariable Long id) {
        try {
            Home home = homeService.getHome(id);
            return new ResponseEntity<>(home, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/by-name/{name}")
    public ResponseEntity<Home> findHomeByName(@PathVariable String name) {
        try {
            Home home = homeService.findHomeByName(name);
            if (home != null) {
                return new ResponseEntity<>(home, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/count")
    public ResponseEntity<Integer> getQuantityOfHomes() {
        try {
            int quantity = homeService.getQuantityOfHomes();
            return new ResponseEntity<>(quantity, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
