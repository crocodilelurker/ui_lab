package com.swagat.uilabbackend.service;


import com.swagat.uilabbackend.model.Component;
import com.swagat.uilabbackend.repository.ComponentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ComponentService {

    @Autowired
    private ComponentRepository componentRepository;

    public Component submitNewComponent(Component component) {
        component.setStatus("PENDING");
        return componentRepository.save(component);
    }
    public List<Component> getAllComponents() {
        return componentRepository.findAll();
    }

}
