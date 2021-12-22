package com.tkyngs.hurima.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.context.restart.RestartEndpoint;
import org.springframework.stereotype.Service;

/**
 * @author Sowa Takayanagi
 * @version 1.0.0
 * @since 12/22/2021 8:48 PM
 */

@Service
public class RestartService {

    @Autowired
    private RestartEndpoint restartEndpoint;

    public void restartApp() {
        restartEndpoint.restart();
    }
}
