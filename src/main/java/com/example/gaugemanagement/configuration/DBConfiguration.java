package com.example.gaugemanagement.configuration;

import com.zaxxer.hikari.HikariDataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
public class DBConfiguration
{
    @Bean
    public HikariDataSource returnDataSource()
    {
        HikariDataSource dataSource = new HikariDataSource();
        dataSource.setJdbcUrl("jdbc:mysql://10.14.2.8/gauge-managing-tool");
        dataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");
        dataSource.setUsername("lsm");
        dataSource.setPassword("lsm123");

        return dataSource;
    }
}
