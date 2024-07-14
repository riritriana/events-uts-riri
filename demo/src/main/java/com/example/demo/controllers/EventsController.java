package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.Events;
import com.example.demo.repository.EventsRepositoty;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/event")

public class EventsController {
    @Autowired
    private EventsRepositoty eventsRepositoty;

    @GetMapping
    private List<Events> getAll() {
        return eventsRepositoty.findAll();
    }

    @PostMapping()
    public Events create(@RequestBody Events events) {
        return eventsRepositoty.save(events);
    }

    @PutMapping()
    public String editById(@RequestBody Events events) {
        eventsRepositoty.save(events);
        return "Events berhasil diperbarui";

    }

    @DeleteMapping({ "id" })
    public String delete(@PathVariable Long id) {
        eventsRepositoty.deleteById(id);
        return "Events berhasil dihapus";
    }
}
