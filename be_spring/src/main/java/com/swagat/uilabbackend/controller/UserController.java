package com.swagat.uilabbackend.controller;


import com.swagat.uilabbackend.dto.UserResponseDTO;
import com.swagat.uilabbackend.model.User;
import com.swagat.uilabbackend.repository.UserRepository;
import com.swagat.uilabbackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    /*
    @GetMapping("/promote/{username}")
    public ResponseEntity<String> promoteUser(@PathVariable String username) {
        java.util.Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.setRole("ROLE_ADMIN");
            userRepository.save(user);
            return ResponseEntity.ok("User " + username + " promoted to ROLE_ADMIN successfully!");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    */

    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDTO> getUserById(@PathVariable Long id)
    {
        UserResponseDTO result = userService.getById(id);
        if(result != null)
            return ResponseEntity.ok(result);
        else
            return ResponseEntity.notFound().build();
    }

    @GetMapping("")
    public ResponseEntity<List<UserResponseDTO>> getAllUsers()
    {
        List<UserResponseDTO> result = userService.getAllUsers();
        return ResponseEntity.ok(result);
    }
}
