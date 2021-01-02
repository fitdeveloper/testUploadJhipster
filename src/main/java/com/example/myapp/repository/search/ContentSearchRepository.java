package com.example.myapp.repository.search;

import com.example.myapp.domain.Content;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


/**
 * Spring Data Elasticsearch repository for the {@link Content} entity.
 */
public interface ContentSearchRepository extends ElasticsearchRepository<Content, Long> {
}
