package com.swagat.uilabbackend.service;

import com.swagat.uilabbackend.dto.UserResponseDTO;
import com.swagat.uilabbackend.model.User;
import com.swagat.uilabbackend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public UserResponseDTO register(User user)
    {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole("ROLE_USER");
        User result = userRepository.save(user);
        return new UserResponseDTO(result.getId(), result.getEmail(), result.getUsername(), result.getRole());
    }
}
