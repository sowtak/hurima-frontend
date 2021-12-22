package com.tkyngs.hurima.security.jwt;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @author Sowa Takayanagi
 * @version 1.0.0
 * @since 12/21/2021 11:17 PM
 */

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    private static final Logger log = LoggerFactory.getLogger(JwtAuthenticationEntryPoint.class);

    @Override
    public void commence(javax.servlet.http.HttpServletRequest request,
                         HttpServletResponse response,
                         AuthenticationException ex)
            throws IOException, ServletException {
        log.error("Responding with unauthorized error. Message - {}", ex.getMessage());
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, ex.getMessage());
    }
}
