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

    @Column(nullable = false)
    private String developer;

    private String status;
    // Setters and getters
    public Long getId(){return this.id;}
    public void setId(Long id){this.id=id; }

    public String getTitle(){return this.title;}
    public void setTitle(String title){this.title=title;}

    public String getReactCode(){return this.reactCode;}
    public void setReactCode(String reactCode){this.reactCode=reactCode;}

    public String getStatus(){return this.status;}
    public void setStatus(String status){this.status=status;}

    public String getDeveloper(){return this.developer;}
    public void setDeveloper(String developerId){this.developer=developer;}

}
