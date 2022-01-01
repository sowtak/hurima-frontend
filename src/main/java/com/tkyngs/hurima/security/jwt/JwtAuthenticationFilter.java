package com.tkyngs.hurima.security.jwt;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @author Sowa Takayanagi
 * @version 1.0.0
 * @since 12/21/2021 11:36 PM
 */

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends GenericFilter {

  private final JwtTokenProvider jwtTokenProvider;

  private static final Logger log = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

  @Override
  public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws ServletException, IOException {
    String jwt = jwtTokenProvider.resolveToken((HttpServletRequest) servletRequest);

    try {
      if (jwt != null && jwtTokenProvider.validateToken(jwt)) {
        Authentication authentication = jwtTokenProvider.getAuthentication(jwt);

        if (authentication != null) {
          SecurityContextHolder.getContext().setAuthentication(authentication);
        }
      }
    } catch (JwtAuthenticationException ex) {
      SecurityContextHolder.clearContext();
      ((HttpServletResponse) servletRequest).sendError(ex.getHttpStatus().value());
      log.error("Error filtering jwt", ex);
      throw new JwtAuthenticationException("Token invalid or has expired");
    }
    filterChain.doFilter(servletRequest, servletResponse);
  }
}
