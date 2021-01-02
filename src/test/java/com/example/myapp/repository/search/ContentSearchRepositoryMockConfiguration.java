package com.example.myapp.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link ContentSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class ContentSearchRepositoryMockConfiguration {

    @MockBean
    private ContentSearchRepository mockContentSearchRepository;

}
