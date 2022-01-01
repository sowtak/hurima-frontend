package com.tkyngs.hurima.security.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;

/**
 * @author Sowa Takayanagi
 * @version 1.0.0
 * @since 12/20/2021 10:58 PM
 */

@Component
@RequiredArgsConstructor
public class JwtTokenProvider {

  private static final Logger log = LoggerFactory.getLogger(JwtTokenProvider.class);

  @Lazy
  private final
  UserDetailsService userDetailsService;

  @Value("${app.jwtHeader}")
  private String authorizationHeader;

  @Value("${app.jwtSecretKey}")
  private String jwtSecretKey;

  @Value("${app.jwtExpirationInMs}")
  private int jwtExpirationInMs;

  private byte[] jwtSecretKeyBytesDecoded;

  @PostConstruct
  protected void init() {
    byte[] jwtSecretKeyBytes = jwtSecretKey.getBytes(StandardCharsets.UTF_8);
    jwtSecretKeyBytesDecoded = Base64.getDecoder().decode(jwtSecretKeyBytes);
  }

  public String generateToken(String email, String userRole) {

    Claims claims = Jwts.claims().setSubject(email);
    claims.put("role", userRole);
    Date now = new Date();
    Date expiryDate = new Date(now.getTime() + jwtExpirationInMs);

    return Jwts.builder()
      .setClaims(claims)
      .setIssuedAt(now)
      .setExpiration(expiryDate)
      .signWith(Keys.hmacShaKeyFor(jwtSecretKeyBytesDecoded))
      .compact();
  }

  public String resolveToken(HttpServletRequest request) {
    return request.getHeader(authorizationHeader);
  }

  public boolean validateToken(String authToken) {
    try {
      Jwts.parserBuilder()
        .setSigningKey(jwtSecretKey)
        .build()
        .parseClaimsJws(authToken);
      return true;
    } catch (SignatureException ex) {
      log.error("Invalid JWT signature");
    } catch (MalformedJwtException ex) {
      log.error("Invalid JWT token");
    } catch (ExpiredJwtException ex) {
      log.error("Expired JWT token");
    } catch (UnsupportedJwtException ex) {
      log.error("Unsupported JWT token");
    } catch (IllegalArgumentException ex) {
      log.error("JWT claims string is empty.");
    }
    return false;
  }

  public Authentication getAuthentication(String jwt) {
    UserDetails userDetails = this.userDetailsService.loadUserByUsername(getUsernameFromJwt(jwt));
    return new UsernamePasswordAuthenticationToken(userDetails, userDetails.getAuthorities());
  }

  public String getUsernameFromJwt(String jwt) {

    return Jwts.parserBuilder()
      .setSigningKey(jwtSecretKey)
      .build()
      .parseClaimsJws(jwt)
      .getBody()
      .getSubject();
  }
}
