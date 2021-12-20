package com.tkyngs.hurima.config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.context.annotation.Bean;

/**
 * @author Sowa Takayanagi
 * @version 1.0.0
 * @since 12/18/2021 7:39 PM
 */


public class DatabaseConfig {

    private final Logger log = LoggerFactory.getLogger(getClass());

    @Bean(destroyMethod = "close")
    public HikariDataSource dataSource(DataSourceProperties dataSourceProperties) {
        log.debug("Configuring Datasource");

        HikariConfig config = new HikariConfig();
        config.setDataSourceClassName(dataSourceProperties.getDriverClassName());

        config.addDataSourceProperty("url", dataSourceProperties.getUrl());
        if (dataSourceProperties.getUsername() != null) {
            config.addDataSourceProperty("user", dataSourceProperties.getUsername());
        } else {
            config.addDataSourceProperty("user", "");
        }

        if (dataSourceProperties.getPassword() != null) {
            config.addDataSourceProperty("password", dataSourceProperties.getPassword());
        } else {
            config.addDataSourceProperty("password", "");
        }

        return new HikariDataSource(config);
    }
}
