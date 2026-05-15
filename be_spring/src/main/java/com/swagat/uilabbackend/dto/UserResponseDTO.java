package com.swagat.uilabbackend.dto;

public class UserResponseDTO {

    private Long id;
    private String email;
    private String username;
    private String role;

    public UserResponseDTO(Long id, String email, String username, String role)
    {
        this.id= id;
        this.email = email;
        this.username = username;
        this.role = role;
    }

    public Long getId(){ return this.id; }
    public String getEmail(){ return this.email; }
    public String getUsername(){ return this.username; }
    public String getRole(){ return this.role; }
}
