package com.tkyngs.hurima.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

/**
 * @author Sowa Takayanagi
 * @version 1.0.0
 * @since 12/19/2021 10:18 AM
 */

@Configuration
@ConfigurationProperties(prefix = "application")
public class ApplicationProperties {

    public static class DataSource {
        private boolean cachePrepStmts = true;

        private int prepStmtCacheSize = 250;

        private int prepStmtCacheSqlLimit = 2048;

        private boolean useServerPrepStmt = true;


    }
}
