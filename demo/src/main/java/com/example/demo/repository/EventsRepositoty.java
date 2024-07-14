package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.models.Events;

public interface EventsRepositoty extends JpaRepository<Events, Long> {

}
