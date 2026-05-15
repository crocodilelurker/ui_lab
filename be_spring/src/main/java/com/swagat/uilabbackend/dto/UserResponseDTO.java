package com.swagat.uilabbackend.dto;

public class UserResponseDTO {

    private Long id;
    private String email;
    private String username;

    public UserResponseDTO(Long id, String email, String username)
    {
        this.id= id;
        this.email = email;
        this.username = username;
    }

    public Long getId(){ return this.id; }
    public String getEmail(){ return this.email; }
    public String getUsername(){ return this.username; }
}
