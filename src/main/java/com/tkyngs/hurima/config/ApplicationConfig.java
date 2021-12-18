package com.tkyngs.hurima.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @author Sowa Takayanagi
 * @version 1.0.0
 * @since 12/18/2021 7:30 PM
 */

@Configuration
public class ApplicationConfig {

    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }
}
