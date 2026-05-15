package com.swagat.uilabbackend.controller;

import com.swagat.uilabbackend.model.Component;
import com.swagat.uilabbackend.service.ComponentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/components")
public class ComponentController {

    @Autowired
    private ComponentService componentService;

    @GetMapping
    public ResponseEntity<List<Component>> getAllComponents()
    {
        List<Component> componentsList = componentService.getAllComponents();
        return ResponseEntity.status(200).body(componentsList);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Component> getComponentById(@PathVariable Long id)
    {
        Component  component = componentService.getComponentById(id);
        if(component != null)
            return ResponseEntity.ok(component);
        else
            return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Component> submitNewComponent(@RequestBody Component component) {
        Component componentSubmitted =  componentService.submitNewComponent(component);
        return ResponseEntity.status(201).body(componentSubmitted);
    }
}
