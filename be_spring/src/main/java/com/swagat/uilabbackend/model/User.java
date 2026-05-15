package com.swagat.uilabbackend.model;


import jakarta.persistence.*;

@Entity
@Table(name= "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String role; // can be ROLE_USER or ROLE_ADMIN

    //getters and setters
    public Long getId(){ return this.id; }
    public String getEmail(){ return this.email; }
    public String getUsername(){ return this.username; }
    public String getPassword(){ return this.password; }
    public String getRole(){ return this.role; }

    public void setId( Long id){ this.id = id; }
    public void setEmail( String email){ this.email = email; }
    public void setUsername( String username){ this.username = username; }
    public void setPassword( String password){ this.password = password; }
    public void setRole( String role){ this.role = role; }
}
