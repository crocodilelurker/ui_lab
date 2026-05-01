package com.swagat.uilabbackend.Controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/components")
public class ComponentController {
    @GetMapping
    public ResponseEntity<String> getAllComponents()
    {
        return ResponseEntity.ok("Hello World by api/components");
    }
}
