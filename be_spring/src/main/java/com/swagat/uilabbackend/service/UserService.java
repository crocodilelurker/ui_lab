package com.swagat.uilabbackend.service;


import com.swagat.uilabbackend.dto.UserResponseDTO;
import com.swagat.uilabbackend.model.User;
import com.swagat.uilabbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public UserResponseDTO getById(Long id)
    {
        Optional<User> result =  userRepository.findById(id);
        if(result.isPresent())
        {
            User user = result.get();
            return new UserResponseDTO(user.getId(),user.getEmail(),user.getUsername());
        }
        return null;
    }

    public List<UserResponseDTO> getAllUsers()
    {
        List <User>  result = userRepository.findAll();
        List<UserResponseDTO> users = new ArrayList<>();
        for(User user : result)
        {
            users.add(new UserResponseDTO(user.getId(),user.getEmail(),user.getUsername()));
        }
        return users;
    }
}
