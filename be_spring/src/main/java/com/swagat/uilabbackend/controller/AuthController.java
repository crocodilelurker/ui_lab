package com.swagat.uilabbackend.controller;


import com.swagat.uilabbackend.dto.UserResponseDTO;
import com.swagat.uilabbackend.model.User;
import com.swagat.uilabbackend.repository.UserRepository;
import com.swagat.uilabbackend.service.AuthService;
import com.swagat.uilabbackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<UserResponseDTO> signup(@RequestBody User user)
    {
        try{
            UserResponseDTO result = authService.register(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(result);
        }
        catch (Exception e){
            System.out.println(e.getMessage());
        }
        return ResponseEntity.status(500).body(null);
    }
}
