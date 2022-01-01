package com.tkyngs.hurima.security;

import com.tkyngs.hurima.model.entity.User;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;

/**
 * @author Sowa Takayanagi
 * @version 1.0.0
 * @since 12/21/2021 9:53 AM
 */

@Data
public class UserPrincipal implements UserDetails {

    private Long id;
    private String email;
    private String password;
    private Map<String, Object> attributes;
    private final Collection<? extends GrantedAuthority> authorities;

    /**
     * Uses this app's role as GrantedAuthority
     * @param user
     * @return
     */
    public static UserPrincipal create(User user) {
        String userRole = user.getRoles().iterator().next().toString();
        List<GrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority(userRole));
        return new UserPrincipal(authorities);
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }


    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
