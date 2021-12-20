package com.tkyngs.hurima.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.servlet.config.annotation.*;

/**
 * @author Sowa Takayanagi
 * @version 1.0.0
 * @since 12/20/2021 8:42 PM
 */

public class WebMvcConfig implements WebMvcConfigurer {
    private final long MAX_AGE_SECS = 3600;

    @Value("${app.cors.allowedOrigins}")
    private String[] allowedOrigins;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(allowedOrigins)
                .allowedMethods("HEAD", "OPTIONS", "GET", "POST", "PUT", "PATCH", "DELETE")
                .maxAge(MAX_AGE_SECS);
    }
}
