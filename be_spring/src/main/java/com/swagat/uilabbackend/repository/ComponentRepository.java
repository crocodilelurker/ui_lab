package com.swagat.uilabbackend.repository;


import com.swagat.uilabbackend.model.Component;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ComponentRepository extends JpaRepository<Component,Long> {
    //free func codes
}
