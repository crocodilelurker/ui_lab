package com.swagat.uilabbackend.model;
import jakarta.persistence.*;

@Entity
@Table(name = "components")
public class Component {
    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private Long id;
    private String title;
    @Column(columnDefinition =  "TEXT")
    private String reactCode;
    @ManyToOne
    @JoinColumn(nullable = true)
    private User developer;
    private String status;
    // Setters and getters
    public Long getId(){return this.id;}
    public void setId(Long id){this.id=id; }

    public User getDeveloper(){return this.developer;}
    public void setDeveloper(User developer){this.developer=developer;}

    public String getTitle(){return this.title;}
    public void setTitle(String title){this.title=title;}

    public String getReactCode(){return this.reactCode;}
    public void setReactCode(String reactCode){this.reactCode=reactCode;}

    public String getStatus(){return this.status;}
    public void setStatus(String status){this.status=status;}

}
